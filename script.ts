//# sourceMappingURL=E:\_Stuff\Projects\superlaser97.github.io\script.js.map

interface SessionBackup
{
    bk_cbroster: CBRoster;
    bk_inputCBResponseArray: CBResponse[];
    bk_inputPlayerDetailsArray: PlayerDetail[];
    bk_playersOnboardArray: PlayerOnboard[];
    bk_loadCbResponsesText: string;
    bk_loadPlayerDetailsText: string;
}

// Struct that stores a single CBResponse
interface CBResponse 
{
    IGN: string;
    WED_1: boolean;
    WED_2: boolean;
    THU_1: boolean;
    THU_2: boolean;
    SAT_1: boolean;
    SAT_2: boolean;
    SUN_M_1: boolean;
    SUN_M_2: boolean;
    SUN_N_1: boolean;
    SUN_N_2: boolean;
    MAX_SLOTS: number;
}

// Struct that stores a single PlayerDetail
interface PlayerDetail 
{
    IGN: string;
    Clan: string;
    PlayerType: PlayerTypes;
    Team: TeamTypes;
    EnterBattle: boolean;
    SortieDone: boolean;
    ShipProfessency: string;
    Remarks: string;
}

// ENUM for player types
enum PlayerTypes 
{
    UNKNOWN = "UNKNOWN",
    PLAYER = "PLAYER",
    CALLER = "CALLER"
}

enum TeamTypes 
{
    UNKNOWN = "UNKNOWN",
    BLUE = "BLUE",
    RED = "RED"
}

enum PlayerRemarks 
{
    NONE = "NONE",
    NOT_PARTICIPATING = "NOT PARTICIPATING",
    PLAYER_NOT_FOUND = "PLAYER NOT FOUND",
    DUPLICATE_ENTRY = "DUPLICATE ENTRY",
    DID_NOT_DO_SORTIE = "DID NOT DO SORTIE",
    DID_NOT_SUBMIT = "DID NOT SUBMIT",
}

interface SessionWatchType
{
    SessionID: string;
    SessionTypeID: number;
}

// Static array that contains all player positions
const ALLPLAYERPOSITIONS: string[] =
[
    "CALLER_1",
    "CALLER_2",
    "PLAYER_1",
    "PLAYER_2",
    "PLAYER_3",
    "PLAYER_4",
    "PLAYER_5",
];

// Static array that contains all dates
const ALLSESSIONSLOTS: string[] =
    [
        "WEDNESDAY_1",
        "WEDNESDAY_2",
        "THURSDAY_1",
        "THURSDAY_2",
        "SATURDAY_1",
        "SATURDAY_2",
        "SUNDAY_MORNING_1",
        "SUNDAY_MORNING_2",
        "SUNDAY_NIGHT_1",
        "SUNDAY_NIGHT_2"
    ];

// Static array that contains all teams
const ALLTEAMS: string[] =
    [
        "BLUE",
        "RED",
        "RED2"
    ];

interface PlayerOnboard 
{
    IGN: string;
    Clan: string;
    PlayerType: PlayerTypes;
    Team: TeamTypes;
    EnterBattle: boolean;
    SessionSlotsSelected: string[];
    MAX_SLOTS: number;
    ShipProfessency: string;
    SortieDone: boolean;
    PlayerRemarks: PlayerRemarks[];
    Remarks: string;
}

// Struct that stores Rostering data
interface CBRoster 
{
    // Zero Layer - team
    // First layer - Session (Wed1, Wed2, Thu1, Thu2, Sat1, Sat2, SunM1, SunM2, SunN1, SunN2)
    // Second layer - Position in Session (Caller1, Caller2, Player1, Player2, Player3, Player4, Player5)
    // Third layer - Pool of players (AnotherLazyBoy, Bob778_, Cascayd etc.)
    Players: PlayerInSlot[][][][];
    PlayerSlotAssigments: PlayerSlotAssigment[];
    SessionWatchTypes: SessionWatchType[];
}

// Struct used to backup roster data
interface CBRosterBackup
{
    // Zero Layer - Team Type (Red or Blue)
    // First layer - Session (Wed1, Wed2, Thu1, Thu2, Sat1, Sat2, SunM1, SunM2, SunN1, SunN2)
    // Second layer - Players in Session (Caller1, Caller2, Player1, Player2, Player3, Player4, Player5)
    SelectedPlayers: string[][][];
}

// Struct that stores a single playerSessionData
interface PlayerInSlot 
{
    Selected: boolean;
    IGN: string;
    Clan: string;
    PlayerType: PlayerTypes;
    Team: TeamTypes;
    EnterBattle: boolean;
    ShipProfessency: string;
    SortieDone: boolean;
}

interface PlayerSlotAssigment 
{
    IGN: string;
    Clan: string;
    MaxSessionsToAssign: number;
}

// Array of InputCBScheduleResponse
let inputCBResponseArray: CBResponse[] = [];
// Array of InputPlayerDetails
let inputPlayerDetailsArray: PlayerDetail[] = [];

let playersOnboardArray: PlayerOnboard[] = [];

// cbRosterData
let cbRoster: CBRoster = { Players: [], PlayerSlotAssigments: [], SessionWatchTypes: []};

let showExtraPlayerInfoInRosteringTable = true;

// Use JsonBlob to save everything to cloud
let jsonBlobAPIKey:string = "";

function OnPageLoad()
{
    let jsonApiKeyTextArea:HTMLTextAreaElement = document.getElementById("key-textarea") as HTMLTextAreaElement;

    let key:any = localStorage.getItem("jsonBlobAPIKey");
    if(key != null)
        jsonApiKeyTextArea.value = key as string;
}

function OnKeyChange()
{
    let jsonApiKeyTextArea:HTMLTextAreaElement = document.getElementById("key-textarea") as HTMLTextAreaElement;
    localStorage.setItem("jsonBlobAPIKey", jsonApiKeyTextArea.value);
}

function OnBtnClick_LoadCBResponses() 
{
    // Get the input string from the textarea
    let textArea: HTMLTextAreaElement = document.getElementById("inputCBResponses-textarea") as HTMLTextAreaElement;
    ParseInputCBResponseString(textArea.value);
    UpdateTableWithCBResponses();
}

function OnBtnClick_LoadPlayerDetails() 
{
    // Get the input string from the textarea
    let textArea: HTMLTextAreaElement = document.getElementById("inputPlayerDetails-textarea") as HTMLTextAreaElement;
    ParseInputPlayerDetailsString(textArea.value);
    UpdateTableWithPlayerDetails();
}

function OnBtnClick_GeneratePlayersOnboard() 
{
    GeneratePlayersOnboardArray();
    UpdateTableWithPlayersOnboardArray();
}

function OnBtnClick_GenerateRosteringTable() 
{
    GenerateRosterData();
    UpdateRosteringTableUIElements()
}

function OnBtnClick_ToggleExtraInfo()
{
    showExtraPlayerInfoInRosteringTable = !showExtraPlayerInfoInRosteringTable;
    UpdateRosteringTableUIElements();
}

function OnSelectElementChanged(selectElement: HTMLSelectElement)
{
    let team: number = Number(selectElement.id.split("-")[0]);
    let slot: number = Number(selectElement.id.split("-")[1]);
    let playerPosition: number = Number(selectElement.id.split("-")[2]);

    let playersInPosition: PlayerInSlot[] = cbRoster.Players[team][slot][playerPosition];

    // For each player in position
    for (let j = 0; j < playersInPosition.length; j++)
    {
        let playerInPosition: PlayerInSlot = playersInPosition[j];

        playerInPosition.Selected = false;
        
        // If select element value contains player IGN
        if (selectElement.value.toLowerCase().includes(playerInPosition.IGN.toLowerCase()))
        {
            playerInPosition.Selected = true;
        }
    }

    UpdateRosteringTableUIElements();
}

function OnSelectElementHovered(selectElement: HTMLSelectElement)
{
    // Get the selected value of the select element
    let selectedValue: string = selectElement.value;
    selectedValue = selectedValue.replace(/\[.*\] /g, "");

    if(selectedValue === "None")
    {
        return;
    }

    // Get the player detail that IGN matches the selected value
    // Selected value contains the clan tag, so we need to remove it
    let playerDetail = inputPlayerDetailsArray.find(x => x.IGN.toLowerCase() === selectedValue.toLowerCase());
    if(playerDetail === undefined)
    {
        console.log("Player detail not found for IGN: " + selectedValue);
        return;
    }

    playerDetail = playerDetail as PlayerDetail;

    if(playerDetail.Remarks === "")
    {
        return;
    }

    // Get the hover element
    let hoverElement: HTMLDivElement = document.getElementById("tooltipContainer") as HTMLDivElement;

    // Replace line break in playerDetail.remarks with <br>
    let playerDetailRemarks: string = playerDetail.Remarks.replace("\n", "<br>");

    hoverElement.innerHTML = playerDetailRemarks;
    hoverElement.style.display = "block";

    // Get select element global position relative to the screen
    let selectElement_topPos = selectElement.getBoundingClientRect().top;
    let selectElement_leftPos = selectElement.getBoundingClientRect().left;

    // Get hoverElement height
    let hoverElement_height = hoverElement.getBoundingClientRect().height;

    // Get width and height of display
    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    if(displayWidth - selectElement_leftPos < 350)
    {
        hoverElement.style.left = (selectElement_leftPos - 250) + "px";
    }
    else
    {
        hoverElement.style.left = (selectElement_leftPos) + "px";
    }

    hoverElement.style.top = (selectElement_topPos + 25) + "px";

    
    if(displayHeight - selectElement_topPos < 350)
    {
        hoverElement.style.top = (selectElement_topPos - hoverElement_height) + "px";
    }
    else
    {
        hoverElement.style.bottom = (selectElement_topPos) + "px";
    }
}

function OnSelectElementUnhovered()
{
    // Get the hover element
    let hoverElement: HTMLDivElement = document.getElementById("tooltipContainer") as HTMLDivElement;
    hoverElement.style.display = "none";
}

function OnCellClicked(cell: HTMLTableCellElement)
{
    // Get the select element
    let selectElement: HTMLSelectElement = cell.getElementsByTagName("select")[0] as HTMLSelectElement;
    // Get the textbox element
    let textboxElement: HTMLInputElement = cell.getElementsByTagName("input")[0] as HTMLInputElement;

    // If select element display is none
    if (selectElement.style.display === "none")
    {
        // Show the select element
        selectElement.style.display = "block";
        // Hide the textbox element
        textboxElement.style.display = "none";
    }
    else
    {
        // Hide the select element
        selectElement.style.display = "none";
        // Show the textbox element
        textboxElement.style.display = "block";
    }
}

function UpdateUnrosteredPlayers(): void
{
    let unrosteredPlayersTable = document.getElementById("unrosteredPlayersTable");

    if(!unrosteredPlayersTable)
    {
        console.log("unrosteredPlayersTable is null");
        return;
    }

    unrosteredPlayersTable.innerHTML = "";
    let unrosteredPlayers: string[] = [];
    let unrosteredPlayersCount: string[] = [];

    for(let sessionIndex = 0; sessionIndex < 10; sessionIndex++)
    {
        let unrosteredPlayersInSession: string[] = GetUnrosteredPlayersFromSession(sessionIndex);
        let unrosteredPlayersInSession_string: string = "";

        // foreach unrosteredPlayersInSession
        for(let i = 0; i < unrosteredPlayersInSession.length; i++)
        {
            unrosteredPlayersInSession_string += unrosteredPlayersInSession[i] + "<br>";
        }
        unrosteredPlayers.push(unrosteredPlayersInSession_string);
        unrosteredPlayersCount.push(unrosteredPlayersInSession.length.toString() + " Players Unrostered");
    }
        
    AddRowToTable("unrosteredPlayersTable", unrosteredPlayersCount, "orangeColoredTableRow");
    AddRowToTable("unrosteredPlayersTable", unrosteredPlayers);
}





function UpdateRosteringTableUIElements()
{
    UpdateTableWithRosterData();
    UpdateAssignedSlotsTrackerWithRosterData();
    UpdateSessionClanBaseHeader();
    UpdateRosteringTableCellColors();
    UpdateAllRosteringTableCellsWithPlayerData();
    UpdateUnrosteredPlayers();
}

function UpdateAllRosteringTableCellsWithPlayerData()
{
    if(showExtraPlayerInfoInRosteringTable == false)
    {
        return;
    }

    var extraInfoCaller_HTMLTemplate: string = '<div class="extra-info extra-info-caller">CALLER</div>';
    var extraInfoEnterBtl_HTMLTemplate: string = '<div class="extra-info extra-info-startbtl">BTL</div>';
    var extraInfoNoSortie_HTMLTemplate: string = '<div class="extra-info extra-info-nosortie">NO SORTIE</div>';
    var extraInfoStartBlueTeam_HTMLTemplate: string = '<div class="extra-info extra-info-bluteam">BLUE</div>';
    var extraInfoStartRedTeam_HTMLTemplate: string = '<div class="extra-info extra-info-redteam">RED</div>';

    var extraInfoShipProf_HTMLTemplate: string = '<div class="extra-info extra-info-shipprof">XXX</div>';

    for (let team = 0; team < cbRoster.Players.length; team++)
    {
        for (let session = 0; session < cbRoster.Players[team].length; session++)
        {
            for (let playerSlot = 0; playerSlot < cbRoster.Players[team][session].length; playerSlot++)
            {
                // Get the selected player
                let playersInSlot: PlayerInSlot[] = cbRoster.Players[team][session][playerSlot];

                // Get the player that is selected
                let selectedPlayer: any = playersInSlot.find(player => player.Selected);
                if(selectedPlayer == undefined)
                {
                    console.log("Error: No player selected");
                    continue;
                }
                selectedPlayer = selectedPlayer as PlayerInSlot;

                // Get the parent of the select element
                let selectedElementID: string = team + "-" + session + "-" + playerSlot;

                // Get the select element
                let selectElement: HTMLSelectElement = document.getElementById(selectedElementID) as HTMLSelectElement;

                if(selectElement == null || selectElement.parentElement == null)
                {
                    console.log("Error: Select element or it's parent is not found");
                    continue;
                }

                // Get the parent of the select element
                let parentElement: HTMLElement = selectElement.parentElement;

                if(selectedPlayer.ShipProfessency !== "")
                {
                    let extraInfoShipProf = extraInfoShipProf_HTMLTemplate
                    extraInfoShipProf = extraInfoShipProf_HTMLTemplate.replace("XXX", selectedPlayer.ShipProfessency);
                    parentElement.prepend(CreateElementFromString(extraInfoShipProf));
                }
                if(selectedPlayer.SortieDone == false && selectedPlayer.IGN !== "None")
                {
                    parentElement.prepend(CreateElementFromString(extraInfoNoSortie_HTMLTemplate));
                }
                if(selectedPlayer.PlayerType == PlayerTypes.CALLER)
                {
                    parentElement.prepend(CreateElementFromString(extraInfoCaller_HTMLTemplate));
                }
                if(selectedPlayer.EnterBattle == true)
                {
                    parentElement.prepend(CreateElementFromString(extraInfoEnterBtl_HTMLTemplate));
                }
                if(selectedPlayer.Team == TeamTypes.BLUE)
                {
                    parentElement.prepend(CreateElementFromString(extraInfoStartBlueTeam_HTMLTemplate));
                }
                if(selectedPlayer.Team == TeamTypes.RED)
                {
                    parentElement.prepend(CreateElementFromString(extraInfoStartRedTeam_HTMLTemplate));
                }
            }
        }
    }
}

function UpdateRosteringTableCellColors()
{
    for(let slot = 0; slot < ALLSESSIONSLOTS.length; slot++)
    {
        let selectElementsInSlot_BlueAndRedTeams: HTMLSelectElement[] = [];

        for(let team = 0; team < ALLTEAMS.length; team++)
        {
            for(let playerPosition = 0; playerPosition < cbRoster.Players[team][slot].length; playerPosition++)
            {
                let selectElementID = team + "-" + slot + "-" + playerPosition;
                selectElementsInSlot_BlueAndRedTeams.push(document.getElementById(selectElementID) as HTMLSelectElement);
            }
        }

        let selectedPlayersInSelectElements: string[] = [];

        // Loop the select elements in slot
        for(let selectElement of selectElementsInSlot_BlueAndRedTeams)
        {
            selectedPlayersInSelectElements.push(selectElement.value);
        }

        let selectedPlayersThatAppearedMoreThanOnce: string[] = GetDuplicateStrings(selectedPlayersInSelectElements);

        // Loop the select elements in slot
        for(let selectElement of selectElementsInSlot_BlueAndRedTeams)
        {
            // Get the parent element of the select element
            let parentElement = selectElement.parentElement;

            if(parentElement == null)
            {
                console.log("Error: parentElement is null");
                continue;
            }

            // If value of selectElement is found in selectedPlayersThatAppearedMoreThanOnce
            // or select element doesn't contain the value of a empty player
            if (selectedPlayersThatAppearedMoreThanOnce.includes(selectElement.value) || selectElement.value.includes("[X] None"))
            {
                // And showExtraPlayerInfoInRosteringTable is true
                if(showExtraPlayerInfoInRosteringTable)
                {
                    // Add a class to the parent element
                    parentElement.classList.add("duplicate-player");
                }
            }
        }
    }
}

function UpdateSessionClanBaseHeader()
{
    for(let team = 0; team < cbRoster.Players.length; team++)
    {
        for(let session = 0; session < cbRoster.Players[team].length; session++)
        {
            // Clan base label header element id
            let clanBaseLabelHeaderElementId: string = team + "-" + session;

            // Get the clan base label header
            let clanBaseLabelHeader: HTMLElement = document.getElementById(clanBaseLabelHeaderElementId) as HTMLElement;

            // Get list of players that are selected
            let playersInPosition: PlayerInSlot[] = [];

            for(let playerPosition = 0; playerPosition < cbRoster.Players[team][session].length; playerPosition++)
            {
                for(let playerCandidate = 0; playerCandidate < cbRoster.Players[team][session][playerPosition].length; playerCandidate++)
                {
                    if(cbRoster.Players[team][session][playerPosition][playerCandidate].Selected)
                    {
                        playersInPosition.push(cbRoster.Players[team][session][playerPosition][playerCandidate]);
                    }
                }
            }

            // Check if there is a player assigned to the first player in the list
            if(playersInPosition[0].IGN != "None")
            {
                clanBaseLabelHeader.innerText = playersInPosition[0].Clan;

                // Remove class
                clanBaseLabelHeader.classList.remove("noBase");
            }
            else
            {
                // Set clan base label header
                clanBaseLabelHeader.innerText = "No Clan Base";

                // Add class
                clanBaseLabelHeader.classList.add("noBase");
            }

            /*
            // Get list of clans from players in position
            let clansInPosition: string[] = playersInPosition.map(player => player.Clan);

            // Get the clans that appears the most in the list
            let mostCommonClan: string = GetMostOccuringString(clansInPosition);

            // Check if the mostCommonClan appears more than or equals to 4 times in the list
            if(mostCommonClan !== "X" && clansInPosition.filter(clan => clan === mostCommonClan).length >= 4)
            {
                // Set clan base label header
                clanBaseLabelHeader.innerText = mostCommonClan;

                // Remove class
                clanBaseLabelHeader.classList.remove("noBase");
            }
            else
            {
                // Set clan base label header
                clanBaseLabelHeader.innerText = "No Clan Base";

                // Add class
                clanBaseLabelHeader.classList.add("noBase");
            }
            */
        }
    }
}

function UpdateAssignedSlotsTrackerWithRosterData()
{
    // Clear the Assigned Slots Tracker div
    let assignedSlotsTracker_div: HTMLDivElement = document.getElementById("assignedSlotsTracker-div") as HTMLDivElement;
    assignedSlotsTracker_div.innerHTML = "";

    // Loop through all players in cbRoster.assignedSlotsTracker
    for (let playerIndex = 0; playerIndex < cbRoster.PlayerSlotAssigments.length; playerIndex++) 
    {
        // Player IGN
        let playerIGN: string = cbRoster.PlayerSlotAssigments[playerIndex].IGN;
        let playerClan: string = cbRoster.PlayerSlotAssigments[playerIndex].Clan;
        let playerIGNwithClan: string = "[" + playerClan + "] " + playerIGN;
        let playerMaxSessionsToAssign: number = cbRoster.PlayerSlotAssigments[playerIndex].MaxSessionsToAssign;
        let playerNumOfTimesAssigned: number = 0;

        // Get list of players in roster that matches the playerIGN
        for(let team = 0; team < cbRoster.Players.length; team++)
        {
            for(let session = 0; session < cbRoster.Players[team].length; session++)
            {
                for(let slot = 0; slot < cbRoster.Players[team][session].length; slot++)
                {
                    for(let candidate = 0; candidate < cbRoster.Players[team][session][slot].length; candidate++)
                    {
                        if(cbRoster.Players[team][session][slot][candidate].IGN === playerIGN && cbRoster.Players[team][session][slot][candidate].Selected === true)
                        {
                            playerNumOfTimesAssigned++;
                        }
                    }
                }
            }
        }

        let idName = "normal";

        if(playerNumOfTimesAssigned === 0)
        {
            idName = "not-rostered"
        }
        if(playerNumOfTimesAssigned > playerMaxSessionsToAssign)
        {
            idName = "over-rostered"
        }

        // New playerSlotContainer element
        let playerSlotContainer: HTMLDivElement = document.createElement("div");
        playerSlotContainer.innerText = playerIGN;
        playerSlotContainer.classList.add("playerSlotContainer");
        playerSlotContainer.onclick = () => { HighlightAllSelectElementsWithPlayer(playerIGNwithClan); };
        
        // New inner div element
        let innerDiv: HTMLDivElement = document.createElement("div");
        innerDiv.id = idName;
        innerDiv.innerText = playerNumOfTimesAssigned.toString() + "/" + playerMaxSessionsToAssign.toString();

        // Append inner div to playerSlotContainer
        playerSlotContainer.appendChild(innerDiv);

        // Append playerSlotContainer to assignedSlotsTracker_div
        assignedSlotsTracker_div.appendChild(playerSlotContainer);
    }
}

function UpdateTableWithRosterData() 
{
    let rosteringTableIDs: string[] = ["rostering-table-blue", "rostering-table-red", "rostering-table-red2"];

    // Clear the table body
    let rosterTable_blue: HTMLTableElement = document.getElementById(rosteringTableIDs[0]) as HTMLTableElement;
    let rosterTable_red: HTMLTableElement = document.getElementById(rosteringTableIDs[1]) as HTMLTableElement;
    let rosterTable_red2: HTMLTableElement = document.getElementById(rosteringTableIDs[2]) as HTMLTableElement;

    rosterTable_blue.tBodies[0].innerHTML = "";
    rosterTable_red.tBodies[0].innerHTML = "";
    rosterTable_red2.tBodies[0].innerHTML = "";

    // Loop the teams
    for (let team = 0; team < ALLTEAMS.length; team++)
    {
        // Loop the playerPositions
        for (let playerPosition = 0; playerPosition < ALLPLAYERPOSITIONS.length; playerPosition++) 
        {
            // Select elements for the table row
            let elementsToAdd: HTMLElement[][] = [];

            // Loop the number of sessions
            for (let sessionSlot = 0; sessionSlot < ALLSESSIONSLOTS.length; sessionSlot++) 
            {
                if(playerPosition >= ALLPLAYERPOSITIONS.length)
                {
                    continue;
                }

                // Players available in player slot
                let playersAvailable: PlayerInSlot[] = cbRoster.Players[team][sessionSlot][playerPosition];

                // Sort playersAvailable by their clan in alphabetical order
                playersAvailable.sort((a, b) => { return a.Clan.localeCompare(b.Clan); });

                let playersAvailable_clan: string[] = playersAvailable.map(player => player.Clan);
                let playersAvailable_ign: string[] = playersAvailable.map(player => player.IGN);
                let playersAvailable_clan_ign: string[] = [];
                for (let i = 0; i < playersAvailable_clan.length; i++) 
                {
                    playersAvailable_clan_ign.push("[" + playersAvailable_clan[i] + "] " + playersAvailable_ign[i]);
                }

                let selectedPlayer_clan: string = playersAvailable.filter(player => player.Selected)[0].Clan;
                let selectedPlayer_ign: string = playersAvailable.filter(player => player.Selected)[0].IGN;
                let selectedPlayer_clan_ign: string = "[" + selectedPlayer_clan + "] " + selectedPlayer_ign;

                let selectElementID: string = team + "-" + sessionSlot + "-" + playerPosition;

                // Create a select element
                let selectElement: HTMLSelectElement = CreateSelectElement(playersAvailable_clan_ign, selectedPlayer_clan_ign, selectElementID, "tableSelect");

                // Create a textebox element
                let textboxElement: HTMLInputElement = CreateTextboxElement("overrideTextbox");
                textboxElement.style.display = "none";

                // Add the select element to the array
                elementsToAdd.push([selectElement, textboxElement]);
            }

            let callerCellClass = "callerCell";
            let classToAddToCell = "";
            if(playerPosition == 0 || playerPosition == 1)
            {
                classToAddToCell = callerCellClass;
            }
            // Add the select elements to the table row
            AddRowToTableAnyData_ForRosteringTable(rosteringTableIDs[team], elementsToAdd, classToAddToCell);
        }
    }

    // Loop the sessiontypes list
    for (let sessionType = 0; sessionType < cbRoster.SessionWatchTypes.length; sessionType++)
    {
        // Get session watch type html element
        let sessionTypeHeader: HTMLElement = 
            document.getElementById(cbRoster.SessionWatchTypes[sessionType].SessionID) as HTMLElement;

        switch(cbRoster.SessionWatchTypes[sessionType].SessionTypeID)
        {
            case 1:
                sessionTypeHeader.style.backgroundColor = "transparent";
                sessionTypeHeader.innerHTML = "";
                break;
            
            case 2:
                sessionTypeHeader.style.backgroundColor = "#C5E2B7";
                sessionTypeHeader.innerHTML = "Practice";
                break;
            
            case 3:
                sessionTypeHeader.style.backgroundColor = "#BDD7EC";
                sessionTypeHeader.innerHTML = "Pushing";
                break;
            
            case 4:
                sessionTypeHeader.style.backgroundColor = "#F8CAB0";
                sessionTypeHeader.innerHTML = "Casual";
                break;
        }
    }
}

function GenerateRosterData() 
{
    let backupCBRoster: CBRosterBackup = { SelectedPlayers: [] };

    if(cbRoster.Players.length > 0)
    {
        // Iterate over cbRoster.Players and get the selected players
        for (let teamIndex = 0; teamIndex < cbRoster.Players.length; teamIndex++)
        {
            backupCBRoster.SelectedPlayers[teamIndex] = [];

            for (let sessionIndex = 0; sessionIndex < cbRoster.Players[teamIndex].length; sessionIndex++)
            {
                backupCBRoster.SelectedPlayers[teamIndex][sessionIndex] = [];

                for (let playerIndex = 0; playerIndex < cbRoster.Players[teamIndex][sessionIndex].length; playerIndex++)
                {
                    let playerInSlots: PlayerInSlot[] = cbRoster.Players[teamIndex][sessionIndex][playerIndex];

                    // For each player in the slot, check if they are selected
                    for (let playerInSlotIndex = 0; playerInSlotIndex < playerInSlots.length; playerInSlotIndex++)
                    {
                        if (playerInSlots[playerInSlotIndex].Selected)
                        {
                            backupCBRoster.SelectedPlayers[teamIndex][sessionIndex].push(playerInSlots[playerInSlotIndex].IGN);
                        }
                    }
                }
            }
        }
    }

    // Clear the roster data
    cbRoster.Players = [];
    cbRoster.PlayerSlotAssigments = [];

    // Add all players in playersOnboardArray to cbRosterData.PlayerSlotAssigments
    // Except players the remarks contains not participating, are duplicates, not found
    for (let i = 0; i < playersOnboardArray.length; i++) 
    {
        let playerOnboard: PlayerOnboard = playersOnboardArray[i];
        if (playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.NOT_PARTICIPATING) == -1 &&
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.DUPLICATE_ENTRY) == -1 &&
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.PLAYER_NOT_FOUND) == -1 &&
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.DID_NOT_SUBMIT) == -1)
        {
            let numOfWatchesAvail = playerOnboard.SessionSlotsSelected.length;
            let maxWatchesRequested = playerOnboard.MAX_SLOTS;
            let numOfWatchesToGive = 0;

            if(numOfWatchesAvail < maxWatchesRequested)
            {
                numOfWatchesToGive = numOfWatchesAvail;
            }
            else
            {
                numOfWatchesToGive = maxWatchesRequested;
            }

            let newPlayerSlotsAssignedData =
            {
                IGN: playerOnboard.IGN,
                Clan: playerOnboard.Clan,
                SessionsAssigned: 0,
                MaxSessionsToAssign: numOfWatchesToGive
            };

            cbRoster.PlayerSlotAssigments.push(newPlayerSlotsAssignedData);
        }
    }

    // Sort the cbRosterData.PlayerSlotAssigments by the player IGN
    cbRoster.PlayerSlotAssigments.sort((a, b) => { return a.IGN.localeCompare(b.IGN); });

    for(let team = 0; team < ALLTEAMS.length; team++)
    {
        cbRoster.Players[team] = [];
        for (let session = 0; session < ALLSESSIONSLOTS.length; session++)
        {
            // Initialize blue team, red team and casual team players arrays
            cbRoster.Players[team][session] = [];
            cbRoster.Players[team][session] = [];
            cbRoster.Players[team][session] = [];
        }
    }

    // For each session slot
    for (let sessionSlot = 0; sessionSlot < ALLSESSIONSLOTS.length; sessionSlot++)
    {
        // Store players that are available for this session slot
        let availablePlayers: PlayerInSlot[] = [];

        // For each player in playersOnboardArray
        for (let i = 0; i < playersOnboardArray.length; i++) 
        {
            let playerOnboard: PlayerOnboard = playersOnboardArray[i];

            // If player ign is not found in cbRosterData.PlayerSlotAssigments
            if (cbRoster.PlayerSlotAssigments.find(x => x.IGN == playerOnboard.IGN) == undefined) 
            {
                continue;
            }

            // If player's session slots selected doesnt contain the current session slot
            if (playerOnboard.SessionSlotsSelected.indexOf(ALLSESSIONSLOTS[sessionSlot]) == -1)
            {
                continue;
            }

            availablePlayers.push(
                {
                    Selected: false,
                    IGN: playerOnboard.IGN,
                    Clan: playerOnboard.Clan,
                    PlayerType: playerOnboard.PlayerType,
                    Team: playerOnboard.Team,
                    EnterBattle: playerOnboard.EnterBattle,
                    SortieDone: playerOnboard.SortieDone,
                    ShipProfessency: playerOnboard.ShipProfessency
                });
        }

        let caller1_candidates: PlayerInSlot[] = [];
        let caller2_candidates: PlayerInSlot[] = [];
        let player1_candidates: PlayerInSlot[] = [];
        let player2_candidates: PlayerInSlot[] = [];
        let player3_candidates: PlayerInSlot[] = [];
        let player4_candidates: PlayerInSlot[] = [];
        let player5_candidates: PlayerInSlot[] = [];

        let emptyPlayer: PlayerInSlot =
        {
            Selected: true,
            IGN: "None",
            Clan: "X",
            PlayerType: PlayerTypes.UNKNOWN,
            Team: TeamTypes.UNKNOWN,
            EnterBattle: false,
            SortieDone: false,
            ShipProfessency: ""
        };

        caller1_candidates.push(emptyPlayer);
        caller2_candidates.push(emptyPlayer);
        player1_candidates.push(emptyPlayer);
        player2_candidates.push(emptyPlayer);
        player3_candidates.push(emptyPlayer);
        player4_candidates.push(emptyPlayer);
        player5_candidates.push(emptyPlayer);

        caller1_candidates = PushArray(caller1_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        caller2_candidates = PushArray(caller2_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player1_candidates = PushArray(player1_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player2_candidates = PushArray(player2_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player3_candidates = PushArray(player3_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player4_candidates = PushArray(player4_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player5_candidates = PushArray(player5_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));

        let allPlayerCandidates: PlayerInSlot[][] = [caller1_candidates, caller2_candidates, player1_candidates, player2_candidates, player3_candidates, player4_candidates, player5_candidates];

        for(let team = 0; team < ALLTEAMS.length; team++)
        {
            for(let memberCount = 0; memberCount < ALLPLAYERPOSITIONS.length; memberCount++)
            {
                cbRoster.Players[team][sessionSlot][memberCount] = JSON.parse(JSON.stringify(allPlayerCandidates[memberCount]));
            }
        }
    }

    if(backupCBRoster.SelectedPlayers.length > 0)
    {
        // Restore the roster data
        // Iterate over cbRoster.Players
        // Team
        for (let teamIndex = 0; teamIndex < cbRoster.Players.length; teamIndex++)
        {
            // Session
            for (let sessionIndex = 0; sessionIndex < cbRoster.Players[teamIndex].length; sessionIndex++)
            {
                // Player Candidates
                for (let playerIndex = 0; playerIndex < cbRoster.Players[teamIndex][sessionIndex].length; playerIndex++)
                {
                    // All player candidates
                    let playerInSlots: PlayerInSlot[] = cbRoster.Players[teamIndex][sessionIndex][playerIndex];

                    // Iterate over playerInSlots
                    for (let playerInSlotIndex = 0; playerInSlotIndex < playerInSlots.length; playerInSlotIndex++)
                    {
                        playerInSlots[playerInSlotIndex].Selected = false;

                        if (backupCBRoster.SelectedPlayers[teamIndex][sessionIndex][playerIndex] === playerInSlots[playerInSlotIndex].IGN)
                        {
                            playerInSlots[playerInSlotIndex].Selected = true;
                        }
                    }

                    // Check if there are no players that are selected
                    if (playerInSlots.filter(player => player.Selected).length === 0)
                    {
                        // Set the last player as selected
                        playerInSlots[playerInSlots.length - 1].Selected = true;
                    }
                }
            }
        }
    }

    let sessionIDList: string[] = [];

    // Loop the sessions
    for (let team = 0; team < ALLTEAMS.length; team++)
    {
        // Loop the number of sessions
        for (let sessionSlot = 0; sessionSlot < ALLSESSIONSLOTS.length; sessionSlot++)
        {
            let sessionIDString = "wt " + team.toString() + "-" + sessionSlot.toString();
            sessionIDList.push(sessionIDString);
        }
    }
    
    // Loop the cbroster session
    for(let a = 0; a < sessionIDList.length; a++)
    {
        let NewSessionWatchType: SessionWatchType = 
        {
            SessionID: sessionIDList[a],
            SessionTypeID: 1
        }

        cbRoster.SessionWatchTypes.push(NewSessionWatchType)
    }
}

// Function to updat the table with the player details
function UpdateTableWithPlayerDetails() 
{
    // Clear table body
    ClearTableBody("playerDetails-table");

    // Loop through the inputPlayerDetailsArray
    for (let i = 0; i < inputPlayerDetailsArray.length; i++) {
        // Get the current player detail
        let playerDetail: PlayerDetail = inputPlayerDetailsArray[i];

        let rowData: string[] = [];
        rowData.push(playerDetail.IGN);
        rowData.push(playerDetail.Clan);
        rowData.push(playerDetail.PlayerType);
        rowData.push(playerDetail.Team);
        rowData.push(playerDetail.EnterBattle ? "YES" : "");
        rowData.push(playerDetail.ShipProfessency);
        rowData.push(playerDetail.SortieDone ? "YES" : "");

        AddRowToTable("playerDetails-table", rowData);
    }
}

// Function to update the table with the input CBResponses
function UpdateTableWithCBResponses() 
{
    // Clear table body
    ClearTableBody("cbResponses-table");

    // Loop through the inputCBResponseArray and create a row for each
    for (let i = 0; i < inputCBResponseArray.length; i++) {
        let rowData: string[] = [];
        rowData.push(inputCBResponseArray[i].IGN);
        rowData.push(inputCBResponseArray[i].WED_1 ? "X" : "");
        rowData.push(inputCBResponseArray[i].WED_2 ? "X" : "");
        rowData.push(inputCBResponseArray[i].THU_1 ? "X" : "");
        rowData.push(inputCBResponseArray[i].THU_2 ? "X" : "");
        rowData.push(inputCBResponseArray[i].SAT_1 ? "X" : "");
        rowData.push(inputCBResponseArray[i].SAT_2 ? "X" : "");
        rowData.push(inputCBResponseArray[i].SUN_M_1 ? "X" : "");
        rowData.push(inputCBResponseArray[i].SUN_M_2 ? "X" : "");
        rowData.push(inputCBResponseArray[i].SUN_N_1 ? "X" : "");
        rowData.push(inputCBResponseArray[i].SUN_N_2 ? "X" : "");
        rowData.push(inputCBResponseArray[i].MAX_SLOTS.toString());

        AddRowToTable("cbResponses-table", rowData);
    }
}

// Function to parse the input csv string into inputCBResponseArray
function ParseInputCBResponseString(inputString: string): void {
    // Clear the inputCBResponseArray
    inputCBResponseArray = [];

    // Split the string into an array of strings
    let inputStringArray: string[] = inputString.split("\n");

    // Loop through the array of strings
    for (let i: number = 0; i < inputStringArray.length; i++) {
        // Split the string into an array of strings
        let inputStringArray2: string[] = inputStringArray[i].split("\t");

        // Create a new CBResponse object
        let newCBResponse: CBResponse = {
            IGN: inputStringArray2[0],
            WED_1: inputStringArray2[1] == "Available" ? true : false,
            WED_2: inputStringArray2[2] == "Available" ? true : false,
            THU_1: inputStringArray2[3] == "Available" ? true : false,
            THU_2: inputStringArray2[4] == "Available" ? true : false,
            SAT_1: inputStringArray2[5] == "Available" ? true : false,
            SAT_2: inputStringArray2[6] == "Available" ? true : false,
            SUN_M_1: inputStringArray2[7] == "Available" ? true : false,
            SUN_M_2: inputStringArray2[8] == "Available" ? true : false,
            SUN_N_1: inputStringArray2[9] == "Available" ? true : false,
            SUN_N_2: inputStringArray2[10] == "Available" ? true : false,
            MAX_SLOTS: parseInt(inputStringArray2[11])
        };

        // Add the new CBResponse object to the inputCBResponseArray
        inputCBResponseArray.push(newCBResponse);
    }
}

// Function to parse the input csv string into inputPlayerDetailsArray
function ParseInputPlayerDetailsString(inputString: string): void 
{
    let inputStringArray = CSVToArray(inputString, "\t");

    // Loop through the array of strings
    for (let i: number = 0; i < inputStringArray.length; i++) 
    {
        // Create a new PlayerDetail object
        let newPlayerDetail: PlayerDetail = 
        {
            IGN: inputStringArray[i][0],
            Clan: inputStringArray[i][1],
            PlayerType: inputStringArray[i][2] == "CALLER" ? PlayerTypes.CALLER : PlayerTypes.PLAYER,
            Team: inputStringArray[i][3] == "RED" ? TeamTypes.RED : TeamTypes.BLUE,
            EnterBattle: inputStringArray[i][4] == "YES" ? true : false,
            SortieDone: inputStringArray[i][5] == "YES" ? true : false,
            ShipProfessency: inputStringArray[i][6],
            Remarks: inputStringArray[i][7]
        };

        // Add the new PlayerDetail object to the inputPlayerDetailsArray
        inputPlayerDetailsArray.push(newPlayerDetail);
    }
}

// Function to create the playersOnboardArray
function GeneratePlayersOnboardArray(): void 
{
    // Clear the playersOnboardArray
    playersOnboardArray = [];

    // Loop through the inputCBResponseArray
    for (let i = 0; i < inputCBResponseArray.length; i++)
    {
        // If player ign is not found in inputplayerdetailsarray, add it to the playersOnboardArray with PLAYER_NOT_FOUND remark
        if (inputPlayerDetailsArray.findIndex(x => x.IGN.toLowerCase() == inputCBResponseArray[i].IGN.toLowerCase()) == -1)
        {
            let newPlayerOnboard: PlayerOnboard = 
            {
                IGN: inputCBResponseArray[i].IGN,
                Clan: "",
                PlayerType: PlayerTypes.UNKNOWN,
                Team: TeamTypes.UNKNOWN,
                EnterBattle: false,
                SortieDone: false,
                ShipProfessency: "",
                Remarks: "",
                PlayerRemarks: [PlayerRemarks.PLAYER_NOT_FOUND],
                SessionSlotsSelected: [],
                MAX_SLOTS: 0
            };

            // Add the new PlayerOnboard object to the playersOnboardArray
            playersOnboardArray.push(newPlayerOnboard);
        }
    }

    // Loop through the inputPlayerDetailsArray
    for (let i = 0; i < inputPlayerDetailsArray.length; i++)
    {
        // Create a new PlayerOnboard object
        let newPlayerOnboard: PlayerOnboard = {
            IGN: inputPlayerDetailsArray[i].IGN,
            Clan: inputPlayerDetailsArray[i].Clan,
            PlayerType: inputPlayerDetailsArray[i].PlayerType,
            Team: inputPlayerDetailsArray[i].Team,
            EnterBattle: inputPlayerDetailsArray[i].EnterBattle,
            ShipProfessency: inputPlayerDetailsArray[i].ShipProfessency,
            SortieDone: inputPlayerDetailsArray[i].SortieDone,
            Remarks: inputPlayerDetailsArray[i].Remarks,
            PlayerRemarks: [],
            SessionSlotsSelected: [],
            MAX_SLOTS: 0
        };

        let currInputCBResponse = inputCBResponseArray.find(x => x.IGN.toLowerCase() == newPlayerOnboard.IGN.toLowerCase());
        if(currInputCBResponse != undefined) 
        {
            currInputCBResponse = currInputCBResponse as CBResponse;

            // If the same IGN appears more than once in inputcbResponseArray
            if(inputCBResponseArray.filter(x => x.IGN.toLowerCase() == newPlayerOnboard.IGN.toLowerCase()).length > 1) 
            {
                newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.DUPLICATE_ENTRY);
            }
            
            if(newPlayerOnboard.SortieDone == false)
            {
                newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.DID_NOT_DO_SORTIE);
            }

            newPlayerOnboard.MAX_SLOTS = currInputCBResponse.MAX_SLOTS;
    
            currInputCBResponse.WED_1 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[0]) : null;
            currInputCBResponse.WED_2 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[1]) : null;
            currInputCBResponse.THU_1 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[2]) : null;
            currInputCBResponse.THU_2 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[3]) : null;
            currInputCBResponse.SAT_1 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[4]) : null;
            currInputCBResponse.SAT_2 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[5]) : null;
            currInputCBResponse.SUN_M_1 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[6]) : null;
            currInputCBResponse.SUN_M_2 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[7]) : null;
            currInputCBResponse.SUN_N_1 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[8]) : null;
            currInputCBResponse.SUN_N_2 ? newPlayerOnboard.SessionSlotsSelected.push(ALLSESSIONSLOTS[9]) : null;

            if(newPlayerOnboard.SessionSlotsSelected.length == 0 || newPlayerOnboard.MAX_SLOTS == 0)
            {
                newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.NOT_PARTICIPATING);
            }
        }
        else
        {
            newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.DID_NOT_SUBMIT);
        }
        
        playersOnboardArray.push(newPlayerOnboard);
    }

    // sort the playersOnboardArray by the IGN ignoring case
    playersOnboardArray.sort((a, b) => a.IGN.toLowerCase() > b.IGN.toLowerCase() ? 1 : -1);
}

// Function to update the table with the playersOnboardArray
function UpdateTableWithPlayersOnboardArray(): void 
{
    // Clear the table body
    ClearTableBody("playersOnBoard-table");

    // Loop through the playersOnboardArray
    for (let i: number = 0; i < playersOnboardArray.length; i++) {
        // Create a new rowData array
        let rowData: string[] = [];

        let PlayerIGN: string = playersOnboardArray[i].IGN;
        let PlayerType: string = playersOnboardArray[i].PlayerType == PlayerTypes.CALLER ? "CALLER" : "PLAYER";
        let Team: string = playersOnboardArray[i].Team == TeamTypes.RED ? "RED" : "BLUE";
        let EnterBattle: string = playersOnboardArray[i].EnterBattle == true ? "YES" : "";
        let ShipProfessency: string = playersOnboardArray[i].ShipProfessency;
        let Clan: string = playersOnboardArray[i].Clan;
        let Remarks: string = "";
        let MAX_SLOTS: string = playersOnboardArray[i].MAX_SLOTS.toString();
        let ResponseData_WED_1: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[0]) == true ? "X" : "";
        let ResponseData_WED_2: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[1]) == true ? "X" : "";
        let ResponseData_THU_1: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[2]) == true ? "X" : "";
        let ResponseData_THU_2: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[3]) == true ? "X" : "";
        let ResponseData_SAT_1: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[4]) == true ? "X" : "";
        let ResponseData_SAT_2: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[5]) == true ? "X" : "";
        let ResponseData_SUN_M_1: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[6]) == true ? "X" : "";
        let ResponseData_SUN_M_2: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[7]) == true ? "X" : "";
        let ResponseData_SUN_N_1: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[8]) == true ? "X" : "";
        let ResponseData_SUN_N_2: string = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[9]) == true ? "X" : "";

        // If player remarks length is greater than 0
        if (playersOnboardArray[i].PlayerRemarks.length > 0) {
            // For each player remarks
            for (let j: number = 0; j < playersOnboardArray[i].PlayerRemarks.length; j++) {
                // Get the enum value as a string
                let playerRemarksString: string = playersOnboardArray[i].PlayerRemarks[j].toString();

                // Add the player remarks string to the remarks string
                Remarks += "[" + playerRemarksString + "] ";
            }
        }

        // Add the player response datas to the rowData array
        rowData.push(PlayerIGN);
        rowData.push(MAX_SLOTS);
        rowData.push(Clan);
        rowData.push(PlayerType);
        rowData.push(Team);
        rowData.push(EnterBattle);
        rowData.push(Remarks);
        rowData.push(ShipProfessency);
        rowData.push(ResponseData_WED_1);
        rowData.push(ResponseData_WED_2);
        rowData.push(ResponseData_THU_1);
        rowData.push(ResponseData_THU_2);
        rowData.push(ResponseData_SAT_1);
        rowData.push(ResponseData_SAT_2);
        rowData.push(ResponseData_SUN_M_1);
        rowData.push(ResponseData_SUN_M_2);
        rowData.push(ResponseData_SUN_N_1);
        rowData.push(ResponseData_SUN_N_2);

        // If player remarks contains PLAYER_NOT_FOUND or DUPLICATE_ENTRY
        if (ItemAppearsInArray(PlayerRemarks.PLAYER_NOT_FOUND, playersOnboardArray[i].PlayerRemarks) == true ||
            ItemAppearsInArray(PlayerRemarks.DUPLICATE_ENTRY, playersOnboardArray[i].PlayerRemarks) == true) {
            // Add the rowData to the table
            AddRowToTable("playersOnBoard-table", rowData, "redColoredTableRow");
            continue;
        }

        // If player remarks contains NOT_PARTICIPATING
        if (ItemAppearsInArray(PlayerRemarks.NOT_PARTICIPATING, playersOnboardArray[i].PlayerRemarks) == true ||
        ItemAppearsInArray(PlayerRemarks.DID_NOT_SUBMIT, playersOnboardArray[i].PlayerRemarks) == true) {
            // Add the rowData to the table
            AddRowToTable("playersOnBoard-table", rowData, "darkColoredTableRow");
            continue;
        }

        // If player remarks contains DID_NOT_DO_SORTIE
        if (ItemAppearsInArray(PlayerRemarks.DID_NOT_DO_SORTIE, playersOnboardArray[i].PlayerRemarks) == true) {
            // Add the rowData to the table
            AddRowToTable("playersOnBoard-table", rowData, "orangeColoredTableRow");
            continue;
        }

        AddRowToTable("playersOnBoard-table", rowData);
    }
}

function CloseCustomSelectWindow()
{
    let selectMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("CustomSelectWindow");

    let selectOverlayParent = selectMenu.parentElement;
    if(selectOverlayParent != null)
    {
        selectOverlayParent.style.display = "none";
    }
    
    // Disable document scroll
    //document.body.style.overflow = 'auto';
}

function SetDivDisplayToNone(panelToUnhide: string): void
{
    // Get the div by the panelToUnhide (id)
    let divToUnhide: HTMLDivElement = <HTMLDivElement>document.getElementById(panelToUnhide);

    // Set the div display to none
    divToUnhide.style.display = "none";
}

function HighlightAllSelectElementsWithPlayer(playerIGNWithClan: string): void
{
    // Get all select elements that has class tableSelect
    let tableSelectElements = document.getElementsByClassName("tableSelect");

    // Loop through the tableSelectElements
    for (let i: number = 0; i < tableSelectElements.length; i++) 
    {
        let tableSelectElement: HTMLSelectElement = <HTMLSelectElement>tableSelectElements[i];
        
        // If "purpleBackground" class is present
        if (tableSelectElement.classList.contains("purpleBackground") == true)
        {
            // Remove the "purpleBackground" class
            tableSelectElement.classList.remove("purpleBackground");
            tableSelectElement.classList.remove("animate__animated");
            tableSelectElement.classList.remove("animate__heartBeat");
        }

        // If selected option is the same as the playerIGNWithClan
        if (tableSelectElement.value == playerIGNWithClan && playerIGNWithClan !== "[X] None")
        {
            // Add the "purpleBackground" class
            tableSelectElement.classList.add("purpleBackground");
            tableSelectElement.classList.add("animate__animated");
            tableSelectElement.classList.add("animate__heartBeat");
        }
    }
}

function OpenCustomSelectMenu(selectElement: HTMLSelectElement): void
{
    // Disable document scroll
    //document.body.style.overflow = 'hidden';

    // Get the select menu
    let selectMenu: HTMLDivElement = <HTMLDivElement>document.getElementById("CustomSelectWindow");

    // Get select element global position relative to the screen
    let selectElement_topPos = selectElement.getBoundingClientRect().top;
    let selectElement_leftPos = selectElement.getBoundingClientRect().left;

    // Get width and height of display
    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    if(displayWidth - selectElement_leftPos < 250)
    {
        selectMenu.style.left = (selectElement_leftPos - 150) + "px";
    }
    else
    {
        selectMenu.style.left = (selectElement_leftPos) + "px";
    }

    selectMenu.style.top = (selectElement_topPos + 25) + "px";

    
    if(displayHeight - selectElement_topPos < 350)
    {
        selectMenu.style.top = (selectElement_topPos - 300) + "px";
    }
    else
    {
        selectMenu.style.bottom = (selectElement_topPos) + "px";
    }
    
    // Set the select menu position

    // Unhide the select menu
    let selectOverlayParent = selectMenu.parentElement;
    if(selectOverlayParent != null)
    {
        selectOverlayParent.style.display = "block";
    }

    // Clear the select menu
    selectMenu.innerHTML = "";

    // Get the select menu options
    let selectOptions: HTMLCollectionOf<HTMLOptionElement> = selectElement.options;

    let currentClan = "";

    // Loop through the select options
    for (let i: number = 0; i < selectOptions.length; i++)
    {
        let selected = false;

        if(selectElement.value == selectOptions[i].value)
        {
            selected = true;
        }
        selectMenu.appendChild(CreateCustomSelectMenuOption(selectElement, selectOptions[i].value, selected));
    }

    // Set the select menu scroll position to the top
    selectMenu.scrollTop = 0;
}

function CreateCustomSelectMenuOption(originalSelectElement: HTMLSelectElement, playerIGNAndClan: string, selected: boolean): HTMLDivElement
{
    // Create a div element
    let divElement: HTMLDivElement = document.createElement("div");

    divElement.classList.add("overlay_selectItem");
    divElement.id = playerIGNAndClan;
    let sessionSlot = originalSelectElement.id.split("-")[1];

    // Get all select elements
    let selectElements = document.getElementsByClassName("tableSelect");
    if(selectElements.length == 0)
    {
        console.log("No select elements found");
        return divElement;
    }

    let selectedValuesFromTheSameSession: string[] = [];
    
    // Loop through the select elements
    for (let i: number = 0; i < selectElements.length; i++)
    {
        let selectElement: HTMLSelectElement = <HTMLSelectElement>selectElements[i];

        // Get the select element id
        let selectElementID: string = selectElements[i].id;

        // If select element is not from the same session slot
        if(selectElementID.split("-")[1] != sessionSlot)
        {
            continue;
        }

        // Get the select element value and add it to the selectedValuesFromTheSameSession array
        selectedValuesFromTheSameSession.push(selectElement.value);
    }

    // If playerIGNAndClan is found in the selectedValuesFromTheSameSession array
    if(ItemAppearsInArray(playerIGNAndClan, selectedValuesFromTheSameSession) == true)
    {
        divElement.classList.add("selected_elsewhere");
    }

    if(selected == true)
    {
        divElement.classList.remove("selected_elsewhere");
        divElement.classList.add("currently_selected");
    }


    // Div on click event
    divElement.onclick = function()
    {
        // Enable document scroll
        //document.body.style.overflow = 'auto';

        // Set originalSelectElement value to the playerIGNAndClan
        originalSelectElement.value = playerIGNAndClan;

        // Hide the select menu
        let selectOverlay = document.getElementById("CustomSelectWindow");

        if(selectOverlay != null)
        {
            let selectOverlayParent = selectOverlay.parentElement;
            if(selectOverlayParent != null)
            {
                selectOverlayParent.style.display = "none";
            }
        }

        OnSelectElementChanged(originalSelectElement); 
    }

    // Get player IGN from playerIGNAndClan
    let playerIGN: string = playerIGNAndClan.split("] ")[1];

    // Get player from playerOnboardArray
    let player = playersOnboardArray.find(player => player.IGN == playerIGN);

    let playerNameIGNLabel = document.createElement("h1");
    playerNameIGNLabel.innerHTML = playerIGNAndClan;
    divElement.appendChild(playerNameIGNLabel);

    //divElement.appendChild(document.createElement("br"));
    
    /*
    if(player.PlayerType == PlayerTypes.CALLER)
    {
        let callerLabel = document.createElement("div");
        callerLabel.classList.add("caller");
        callerLabel.innerHTML = "CALLER ";
        divElement.append(callerLabel);
    }

    if(player.Team == TeamTypes.BLUE)
    {
        let blueTeamLabel = document.createElement("div");
        blueTeamLabel.classList.add("blueteam");
        blueTeamLabel.innerHTML = "BLUE";
        divElement.append(blueTeamLabel);
    }

    if(player.Team == TeamTypes.RED)
    {
        let redTeamLabel = document.createElement("div");
        redTeamLabel.classList.add("redteam");
        redTeamLabel.innerHTML = "RED";
        divElement.append(redTeamLabel);
    }

    if(player.EnterBattle == true)
    {
        let enterBtlLabel = document.createElement("div");
        enterBtlLabel.classList.add("startbtl");
        enterBtlLabel.innerHTML = "BTL";
        divElement.append(enterBtlLabel);
    }

    divElement.appendChild(document.createElement("br"));

    let shipProfessencyLabel = document.createElement("div");
    if(player.ShipProfessency != "")
    {
        shipProfessencyLabel.innerHTML = player.ShipProfessency
    }
    else
    {
        shipProfessencyLabel.innerHTML = "N/A";
    }
    divElement.append(shipProfessencyLabel);


    divElement.appendChild(document.createElement("br"));
    divElement.appendChild(document.createElement("br"));

    let remarksLabel = document.createElement("div");

    if(player.Remarks != "")
    {
        remarksLabel.innerHTML = player.Remarks;
    }
    else
    {
        remarksLabel.innerHTML = "N/A";
    }

    divElement.append(remarksLabel);
    */
    return divElement;
}



// *********** UTILITY FUNCTIONS ***********
// Function that finds an item in the array
// Takes in an array
// Returns the item in the array
function FindItemInArray(item: any, array: any[]): any {
    // Loop through the array
    for (let i: number = 0; i < array.length; i++) {
        // If the item is found
        if (array[i] == item) {
            // Return the item
            return array[i];
        }
    }

    // If the item is not found
    return null;
}

// Function that returns true if the item is found in the array
// Takes in the array
// Takes in the item
// Returns true if the item is found in the array
function ItemAppearsInArray(item: any, array: any[]): boolean {
    // Loop through the array
    for (let i: number = 0; i < array.length; i++) {
        // If the item is found
        if (array[i] == item) {
            // Return true
            return true;
        }
    }

    // If the item is not found
    return false;
}

// Function that checks if an item appears more than once in the array
// Takes in an array
// Takes in the item
// Returns true if the item appears more than once, false otherwise
function ItemAppearsMoreThanOnceInArray(item: any, array: any[]): boolean {
    // Loop through the array
    for (let i: number = 0; i < array.length; i++) {
        // If the item is found
        if (array[i] == item) {
            // Return true
            return true;
        }
    }

    // If the item is not found
    return false;
}

// Function to add a row to a table
// Takes in table id
// Takes in an array of select elements to be added to the row
// Takes in an array of IDs of the cells to be added to the row
// Takes in a class name (optional)
function AddRowToTableAnyData_ForRosteringTable(tableId: string, rowData: any[][], cellClass: string = ""): void 
{
    // Get the table
    let table: HTMLTableElement = document.getElementById(tableId) as HTMLTableElement;

    // Get the table body
    let tableBody: HTMLTableSectionElement = table.tBodies[0];

    // Create a new row
    let newRow: HTMLTableRowElement = document.createElement("tr");

    // For each row data
    for (let i: number = 0; i < rowData.length; i++) 
    {
        // Create a new cell
        let newCell: HTMLTableCellElement = document.createElement("td");

        for(let j = 0; j < rowData[i].length; j++)
        {
            newCell.appendChild(rowData[i][j]);
        }

        // Cell on click event
        newCell.oncontextmenu = function () { OnCellClicked(newCell); };

        if(cellClass != "")
        {
            newCell.classList.add(cellClass);
        }

        // Append the cell to the row
        newRow.appendChild(newCell);
    }

    // Add the row to the table body
    tableBody.appendChild(newRow);

    // Add the row to the table
    table.appendChild(tableBody);
}

// Function to add a row to a table
// Takes in table id
// Takes in an array of string to be added to the row
// Takes in a string (element class) (optional) to be added to the row item
function AddRowToTable(tableID: string, rowData: string[], classToAdd: string = ""): void {
    // Get the table
    let table: HTMLTableElement = document.getElementById(tableID) as HTMLTableElement;

    // Check if table is null
    if (table == null) {
        // Log the error
        console.log("Table with id " + tableID + " does not exist");
        return;
    }

    // Check if table has table body
    if (table.tBodies.length == 0) {
        // Create a new table body
        let tBody: HTMLTableSectionElement = document.createElement("tbody");

        // Add the table body to the table
        table.appendChild(tBody);
    }

    // Create a new row
    let row: HTMLTableRowElement = document.createElement("tr");

    // Loop through the rowData array
    for (let i: number = 0; i < rowData.length; i++) {
        // Create a new cell
        let cell: HTMLTableCellElement = document.createElement("td");

        // Add the cell to the row
        row.appendChild(cell);

        // Add the rowData to the cell
        cell.innerHTML = rowData[i];
    }

    // Add the class to the row items if it is not empty
    if (classToAdd != "") {
        // Loop through the row items
        for (let i: number = 0; i < row.childElementCount; i++) {
            // Add the class to the row item
            row.children[i].classList.add(classToAdd);
        }
    }

    // Add the row to the table body
    table.tBodies[0].appendChild(row);
}


// Function that creates a textbox element
// Takes in the class of the textbox
// Returns the textbox element
function CreateTextboxElement(className: string): HTMLInputElement 
{
    // Create a new textbox
    let textbox: HTMLInputElement = document.createElement("input");

    // Set the type of the textbox to text
    textbox.type = "text";

    // Set the class of the textbox
    textbox.classList.add(className);

    // Return the textbox
    return textbox;
}

// Function that creates a select element
// Takes in a list of string to be added to the select element
// Takes in the option to be selected
// Takes in the id of the select element
// Takes in a string (element class) (optional) to be added to the select element
// Returns the select element
function CreateSelectElement(list: string[], optionToSelect: string, id: string, classToAdd: string = ""): HTMLSelectElement 
{
    // Create a new select element
    let selectElement: HTMLSelectElement = document.createElement("select");

    // Loop through the list
    for (let i: number = 0; i < list.length; i++) {
        // Create a new option
        let option: HTMLOptionElement = document.createElement("option");

        // Set the option value
        option.value = list[i];

        // Set the option text
        option.text = list[i];

        // Add the option to the select element
        selectElement.appendChild(option);
    }

    // If the class to add is not empty
    if (classToAdd != "") 
    {
        // Add the class to the select element
        selectElement.classList.add(classToAdd);
    }

    // Set the select element id
    selectElement.id = id;

    // Set the selected option
    selectElement.value = optionToSelect;

    // Add the on change function
    selectElement.onchange = function() 
    {
        OnSelectElementChanged(selectElement); 
        //HighlightAllSelectElementsWithPlayer(selectElement.selectedOptions[0].value);
    };

    // Add the on hover function
    selectElement.onmouseover = function() 
    { 
        OnSelectElementHovered(selectElement); 
    };

    selectElement.onclick = function()
    {
        //HighlightAllSelectElementsWithPlayer(optionToSelect);
        OpenCustomSelectMenu(selectElement);
    }

    // Prevent select element from expanding
    selectElement.onmousedown = function()
    {
        return false;
    }

    // Add the unhover function
    selectElement.onmouseout = function() { OnSelectElementUnhovered(); };

    // Return the select element
    return selectElement;
}

// Function to toggle div visibility
// Takes in an element id
// Toggle between none and block
function ToggleDivVisibility(elementId: string): void 
{
    // Get the element
    let element = document.getElementById(elementId);

    // If the element is found
    if (element != null) 
    {
        // If the element is visible
        if (element.style.display == "block") 
        {
            // Hide the element
            element.style.display = "none";
        }
        else {
            // Show the element
            element.style.display = "block";
        }
    }
    else
    {
        // Log the error
        console.log("Element with id " + elementId + " does not exist");
    }
}

// Function to toggle table visibility
// Takes in an table id
// Toggle between none and block
// Toggle visiblity of the parent element
function ToggleTableVisibility(tableID: string): void {
    // Get the table
    let table: HTMLTableElement = document.getElementById(tableID) as HTMLTableElement;

    // Check if table is null
    if (table == null) {
        // Log the error
        console.log("Table with id " + tableID + " does not exist");
        return;
    }

    // Check if table has a parent element
    if (table.parentElement == null) {
        // Log the error
        console.log("Table with id " + tableID + " does not have a parent element");
        return;
    }

    // Toggle the parent element visibility
    table.parentElement.style.display = table.parentElement.style.display == "none" ? "block" : "none";
}

// Get unrostered players from a specific session
// Takes in a session id
// Returns an array of string
function GetUnrosteredPlayersFromSession(sessionID: number): string[]
{
    // Create an array to store the players
    let selectedPlayers: string[] = [];
    let unselectedPlayers: string[] = [];

    // Loop through the cbroster teams
    for (let team: number = 0; team < cbRoster.Players.length; team++)
    {
        let playersInSession: PlayerInSlot[][] = cbRoster.Players[team][sessionID];

        for(let playerPosition: number = 0; playerPosition < cbRoster.Players[team][sessionID].length; playerPosition++)
        {
            let selectedPlayerInPosition = playersInSession[playerPosition].find(x => x.Selected == true);
            let notSelectedPlayerInPosition = playersInSession[playerPosition].filter(x => x.Selected == false);
            let selectedPlayerInPositionString: string = "";

            if(selectedPlayerInPosition != null)
            {
                selectedPlayerInPosition = selectedPlayerInPosition as PlayerInSlot;
                selectedPlayerInPositionString = "[" + selectedPlayerInPosition.Clan + "] " + selectedPlayerInPosition.IGN;
            }
            
            if(notSelectedPlayerInPosition != null)
            {
                // for each notSelectedPlayerInPosition
                notSelectedPlayerInPosition = notSelectedPlayerInPosition as PlayerInSlot[];
                for(let i: number = 0; i < notSelectedPlayerInPosition.length; i++)
                {
                    let player: PlayerInSlot = notSelectedPlayerInPosition[i];
                    let playerString: string = "[" + player.Clan + "] " + player.IGN;
                    unselectedPlayers.push(playerString);
                }
            }

            // If selectedPlayerInPositionString is not in selectedPlayers array
            if(selectedPlayerInPositionString != "" && selectedPlayers.indexOf(selectedPlayerInPositionString) == -1)
            {
                // Add the selected player to the selectedPlayers array
                selectedPlayers.push(selectedPlayerInPositionString);
            }
        }
    }

    // Loop the unselected players
    for(let i: number = 0; i < unselectedPlayers.length; i++)
    {
        // If the unselected player is in the selected players array
        // Remove the unselected player from the unselected players array
        if(selectedPlayers.indexOf(unselectedPlayers[i]) != -1)
        {
            unselectedPlayers.splice(i, 1);
            i--;
        }
    }

    // Dedupe the unselected players array
    unselectedPlayers = unselectedPlayers.filter((value, index, self) => self.indexOf(value) === index);

    // Sort the unselected players array
    unselectedPlayers.sort();

    // Return the array
    return unselectedPlayers;
}

// Function to clear table body
// Takes in an table id
function ClearTableBody(tableID: string): void {
    // Get the table
    let table: HTMLTableElement = document.getElementById(tableID) as HTMLTableElement;

    // Check if table is null
    if (table == null) {
        // Log the error
        console.log("Table with id " + tableID + " does not exist");
        return;
    }

    // Check if table has table body
    if (table.tBodies.length == 0) {
        // Log the error
        console.log("Table with id " + tableID + " does not have a table body");
        return;
    }

    // Clear the table body
    table.tBodies[0].innerHTML = "";
}

function CycleWatchType(sessionID: string): void
{
    let sessionWatchType = cbRoster.SessionWatchTypes.find(x => x.SessionID == sessionID);
    
    if (!sessionWatchType) {
        // Handle the case where a matching object was found
        console.log("Invalid Session ID");
    } 
    else 
    {
        sessionWatchType = sessionWatchType as SessionWatchType;

        console.log("Session ID: " + sessionWatchType.SessionID);
        console.log("Curr Session Type ID: " + sessionWatchType.SessionTypeID);

        sessionWatchType.SessionTypeID++;
        if(sessionWatchType.SessionTypeID > 4)
            sessionWatchType.SessionTypeID = 1;
    }

    UpdateRosteringTableUIElements();
}

function ClearWatch(sessionID: string): void
{
    // Prompt if the user wants to clear the watch
    if(!confirm("Are you sure you want to clear the watch?"))
    {
        return;
    }

    // Split sessionId into team and session with '-' as a delimiter
    let team: number = parseInt(sessionID.split("-")[0]);
    let session: number = parseInt(sessionID.split("-")[1]);

    // Get the players in session
    let playersInSession = cbRoster.Players[team][session];

    // For each player position
    for(let i: number = 0; i < playersInSession.length; i++)
    {
        // for each player in position
        for(let j: number = 0; j < playersInSession[i].length; j++)
        {
            // Set the player to not selected
            playersInSession[i][j].Selected = false;

            // If player ign is "None"
            if(playersInSession[i][j].IGN == "None")
            {
                // Set the player to selected
                playersInSession[i][j].Selected = true;
            }
        }
    }
    
    UpdateRosteringTableUIElements();
}

// Function to push an array of elements to an array
// Takes in array to be pushed to
// Takes in an array of items to push
// Returns the array with the items pushed
function PushArray<T>(array: T[], items: T[]): T[] 
{
    // Loop through the items
    for (let i: number = 0; i < items.length; i++) {
        // Push the item to the array
        array.push(items[i]);
    }

    // Return the array
    return array;
}

// Function that filters a multidimensional array
// Takes in a multidimensional array ( 4D array )
// Takes in the value to be filtered
// Returns the items that match the filter
function FilterArray_4Dimension<T>(array: T[][][][], value: T): T[]
{
    // Create a new array
    let newArray: T[] = [];

    // Loop through the array
    for (let i: number = 0; i < array.length; i++) {
        // Loop through the array
        for (let j: number = 0; j < array[i].length; j++) {
            // Loop through the array
            for (let k: number = 0; k < array[i][j].length; k++) {
                // Loop through the array
                for (let l: number = 0; l < array[i][j][k].length; l++) {
                    // If the value matches
                    if (array[i][j][k][l] == value) {
                        // Push the item to the new array
                        newArray.push(value);
                    }
                }
            }
        }
    }

    // Return the new array
    return newArray;
}

function Sleep(ms: number): Promise<void>
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function that takes in an array of strings
// Takes in an occurance count parameter
// Finds out which string has the highest occurance count
// Returns the string with the highest occurance count
function GetMostOccuringString(array: string[]): string
{
    // Create a new array
    let newArray: string[] = [];

    // Loop through the array
    for (let i: number = 0; i < array.length; i++) {
        // If the array item is not in the new array
        if (newArray.indexOf(array[i]) == -1) {
            // Push the array item to the new array
            newArray.push(array[i]);
        }
    }

    // Create a new variable to hold the highest occurance count
    let highestOccuranceCount: number = 0;

    // Create a new variable to hold the most occuring string
    let mostOccuringString: string = "";

    // Loop through the new array
    for (let i: number = 0; i < newArray.length; i++) {
        // Create a new variable to hold the occurance count
        let occuranceCount: number = 0;

        // Loop through the array
        for (let j: number = 0; j < array.length; j++) {
            // If the array item matches the new array item
            if (array[j] == newArray[i]) {
                // Increment the occurance count
                occuranceCount++;
            }
        }

        // If the occurance count is greater than the highest occurance count
        if (occuranceCount > highestOccuranceCount) {
            // Set the highest occurance count
            highestOccuranceCount = occuranceCount;

            // Set the most occuring string
            mostOccuringString = newArray[i];
        }
    }

    // Return the most occuring string
    return mostOccuringString;
}

// Function that takes in an array of strings
// Returns items that appear in the array more than once
function GetDuplicateStrings(array: string[]): string[]
{
    // Create a new array
    let newArray: string[] = [];

    // Loop through the array
    for (let i: number = 0; i < array.length; i++) {
        // If the array item is not in the new array
        if (newArray.indexOf(array[i]) == -1) {
            // Push the array item to the new array
            newArray.push(array[i]);
        }
    }

    // Create a new array
    let duplicateArray: string[] = [];

    // Loop through the new array
    for (let i: number = 0; i < newArray.length; i++) {
        // Create a new variable to hold the occurance count
        let occuranceCount: number = 0;

        // Loop through the array
        for (let j: number = 0; j < array.length; j++) {
            // If the array item matches the new array item
            if (array[j] == newArray[i]) {
                // Increment the occurance count
                occuranceCount++;
            }
        }

        // If the occurance count is greater than 1
        if (occuranceCount > 1) {
            // Push the array item to the duplicate array
            duplicateArray.push(newArray[i]);
        }
    }

    // Return the duplicate array
    return duplicateArray;
}

// Function to create a html DOM element from a string
// Takes in a string
// Returns a DOM element
function CreateElementFromString(string: string): HTMLElement
{
    return new DOMParser().parseFromString(string, "text/html").body.firstChild as HTMLElement;
}

function CSVToArray(strData: string, strDelimiter: string): string[][] 
{
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
  
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
      (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
  
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
  
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
    );
  
  
    // Create an array to hold our data. Give the array
    // a default empty first row.
    let arrData: string[][] = [[]];
  
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
  
  
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
  
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
  
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
      ) {
  
        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);
  
      }
  
      var strMatchedValue;
  
      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
  
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"),
          "\""
        );
  
      } else {
  
        // We found a non-quoted value.
        strMatchedValue = arrMatches[3];
  
      }
  
  
      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
    }
  
    // Return the parsed data.
    return (arrData);
}

function TestSave()
{
    jsonBlobAPIKey = (document.getElementById("key-textarea") as HTMLTextAreaElement).value;
    if(jsonBlobAPIKey == "")
    {
        alert("Please enter your JSON Blob API key.");
        return;
    }

    // Initialize sessionBackup object
    let sessionBackup: SessionBackup = 
    {
        bk_cbroster: cbRoster,
        bk_inputCBResponseArray: inputCBResponseArray,
        bk_inputPlayerDetailsArray: inputPlayerDetailsArray,
        bk_playersOnboardArray: playersOnboardArray,
        bk_loadCbResponsesText: (document.getElementById("inputCBResponses-textarea") as HTMLTextAreaElement).value,
        bk_loadPlayerDetailsText: (document.getElementById("inputPlayerDetails-textarea") as HTMLTextAreaElement).value,
    }

    // Send a HTTP put request to the server
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://api.jsonblob.com/api/jsonBlob/" + jsonBlobAPIKey, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(sessionBackup));
}

function TestLoad()
{
    jsonBlobAPIKey = (document.getElementById("key-textarea") as HTMLTextAreaElement).value;
    if(jsonBlobAPIKey == "")
    {
        alert("Please enter your JSON Blob API key.");
        return;
    }

    // Send a HTTP get request to the server
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.jsonblob.com/api/jsonBlob/" + jsonBlobAPIKey, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    // When the server responds
    xhr.onload = function()
    {
        // Get the data from the server
        let sessionBackup: SessionBackup = JSON.parse(xhr.responseText);

        // Load the data from the server
        cbRoster = sessionBackup.bk_cbroster;
        inputCBResponseArray = sessionBackup.bk_inputCBResponseArray;
        inputPlayerDetailsArray = sessionBackup.bk_inputPlayerDetailsArray;
        playersOnboardArray = sessionBackup.bk_playersOnboardArray;
        (document.getElementById("inputCBResponses-textarea") as HTMLTextAreaElement).value = sessionBackup.bk_loadCbResponsesText;
        (document.getElementById("inputPlayerDetails-textarea") as HTMLTextAreaElement).value = sessionBackup.bk_loadPlayerDetailsText;

        // Update the UI
        OnBtnClick_GeneratePlayersOnboard();
        UpdateRosteringTableUIElements();
    }
}

function TestReset()
{
    jsonBlobAPIKey = (document.getElementById("key-textarea") as HTMLTextAreaElement).value;
    if(jsonBlobAPIKey != "")
    {
        // Send a HTTP delete request to the server
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "https://api.jsonblob.com/api/jsonBlob/" + jsonBlobAPIKey, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }

    // Refresh the page
    location.reload();

    localStorage.clear();
}