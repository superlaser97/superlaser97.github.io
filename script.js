"use strict";
//# sourceMappingURL=E:\_Stuff\Projects\superlaser97.github.io\script.js.map
// Sample string for inputCBResponse
const sample_csv_inputCBResponses = `Hingheru88	Available	Available	Available	Available	Available	Available			Available	Available	8
AnotherLazyBoy	Available		Available		Available	Available	Available	Available	Available		7
songinator	Available		Available		Available				Available		3
swanno1	Available		Available		Available		Available		Available		4
adityakool15	Available										1
niklausmaximus	Available	Available	Available	Available					Available		5
PunMasterWally	Available		Available						Available		2
EyeDeeKayy		Available		Available		Available	Available	Available		Available	8
StAnDin_WoLfY			Available		Available			Available	Available		4
The_Crynek	Available		Available		Available	Available			Available		3
Jeremy07	Available	Available	Available	Available		Available				Available	8
Wolfcain	Available		Available		Available		Available	Available	Available		5
Arrcadedus_1											0
_Ducky_		Available		Available		Available				Available	4
Spaceshiphaku		Available		Available					Available	Available	4
Cascayd	Available	Available	Available	Available	Available	Available			Available	Available	6
Strik3agle98		Available		Available	Available	Available			Available	Available	2
OniichanYamate											0
Wulffenhienze		Available		Available		Available					4
Bob778_	Available		Available		Available					Available	3
ronalchn	Available		Available		Available	Available	Available	Available	Available	Available	6
Nilaos			Available								1
BeardyBandit			Available						Available		2
niklausmaximus			Available	Available						Available	6
Jordysiu915		Available		Available		Available	Available				3
Luc_defender	Available	Available	Available						Available	Available	3
Bagpfbones78											0
LiveOnEvil											0`;
// Sample string for inputCBResponse
const sample_csv_inputPlayerDetails = `Bagpfbones78	VKNGS	PLAYER	BLUE	
Niklausmaximus	VKNGS	PLAYER	BLUE	YES
spaceshiphaku	VKNGS	PLAYER	BLUE	YES
The_Crynek	1AN-W	PLAYER	BLUE	
_Ducky_	VKNGS	CALLER	BLUE	YES
AnotherLazyBoy	VKNGS	CALLER	BLUE	YES
sl3epwalka	VKNGS	PLAYER	BLUE	YES
Wolfcain	AUSNZ	CALLER	BLUE	YES
xDreadHeartz	VKNGS	PLAYER	BLUE	YES
Bob778_	AUSNZ	CALLER	BLUE	YES
Strik3agle98	TKR	PLAYER	BLUE	
Moggytwo	AUSNZ	CALLER	BLUE	YES
jordysiu915	VKNGS	PLAYER	BLUE	YES
Snowball328	REPOI	PLAYER	BLUE	
Cascayd	VKNGS	CALLER	RED	YES
ronalchn	VKNGS	PLAYER	RED	YES
Seiron	RAN_	PLAYER	RED	
Jeremy07	VKNGS	PLAYER	RED	YES
LiveOnEvil	1AN-W	PLAYER	RED	
OniichanYamate	VKNGS	PLAYER	RED	YES
adityakool15	RAN_	PLAYER	RED	
Hingheru88	BOB	CALLER	RED	
Wulffenheinze	BOB	PLAYER	RED	
Arrcadedus_1	BOB	CALLER	RED	
EyeDeeKayy	BOB	PLAYER	RED	
PunMasterWally	BOB	CALLER	RED	
Jimbo762au	AUSNZ	CALLER	RED	
luc_defender	VKNGS	PLAYER	RED	
SyIvia	AYNME	PLAYER	RED	
stoolz	AUSNZ	CALLER	RED	
swanno1	BOB	CALLER	RED	
BlackDe47h	BOB	CALLER	RED	
Tramapolean	VKNGS	PLAYER	RED	
songinator	BOB	PLAYER	RED	
BeardyBandit	BOB	CALLER	RED	
9_9_destroyer	VKNGS	CALLER	RED	YES
LiveOnEvil	VKNGS	PLAYER	BLUE	`;
// ENUM for player types
var PlayerTypes;
(function (PlayerTypes) {
    PlayerTypes["UNKNOWN"] = "UNKNOWN";
    PlayerTypes["PLAYER"] = "PLAYER";
    PlayerTypes["CALLER"] = "CALLER";
})(PlayerTypes || (PlayerTypes = {}));
var TeamTypes;
(function (TeamTypes) {
    TeamTypes["UNKNOWN"] = "UNKNOWN";
    TeamTypes["BLUE"] = "BLUE";
    TeamTypes["RED"] = "RED";
})(TeamTypes || (TeamTypes = {}));
var PlayerRemarks;
(function (PlayerRemarks) {
    PlayerRemarks["NONE"] = "NONE";
    PlayerRemarks["NOT_PARTICIPATING"] = "NOT PARTICIPATING";
    PlayerRemarks["PLAYER_NOT_FOUND"] = "PLAYER NOT FOUND";
    PlayerRemarks["DUPLICATE_ENTRY"] = "DUPLICATE ENTRY";
    PlayerRemarks["DID_NOT_DO_SORTIE"] = "DID NOT DO SORTIE";
})(PlayerRemarks || (PlayerRemarks = {}));
// Static array that contains all player positions
const ALLPLAYERPOSITIONS = [
    "CALLER_1",
    "CALLER_2",
    "PLAYER_1",
    "PLAYER_2",
    "PLAYER_3",
    "PLAYER_4",
    "PLAYER_5",
];
// Static array that contains all dates
const ALLSESSIONSLOTS = [
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
const ALLTEAMS = [
    "BLUE",
    "RED"
];
// Array of InputCBScheduleResponse
let inputCBResponseArray = [];
// Array of InputPlayerDetails
let inputPlayerDetailsArray = [];
let playersOnboardArray = [];
// cbRosterData
let cbRoster = { Players: [], PlayerSlotAssigments: [] };
let showExtraPlayerInfoInRosteringTable = true;
function OnPageLoad() {
}
function OnBtnClick_LoadCBResponses() {
    // Get the input string from the textarea
    let textArea = document.getElementById("inputCBResponses-textarea");
    ParseInputCBResponseString(textArea.value);
    UpdateTableWithCBResponses();
}
function OnBtnClick_LoadPlayerDetails() {
    // Get the input string from the textarea
    let textArea = document.getElementById("inputPlayerDetails-textarea");
    ParseInputPlayerDetailsString(textArea.value);
    UpdateTableWithPlayerDetails();
}
function OnBtnClick_GeneratePlayersOnboard() {
    GeneratePlayersOnboardArray();
    UpdateTableWithPlayersOnboardArray();
}
function OnBtnClick_GenerateRosteringTable() {
    GenerateRosterData();
    UpdateRosteringTableUIElements();
}
function OnBtnClick_ImportRosterData() {
    let roster_textarea = document.getElementById("export-import-rosteringtable-textarea");
    cbRoster = JSON.parse(roster_textarea.value);
    UpdateRosteringTableUIElements();
}
function OnBtnClick_ExportRosterData() {
    let roster_textarea = document.getElementById("export-import-rosteringtable-textarea");
    roster_textarea.value = JSON.stringify(cbRoster);
}
function OnBtnClick_ToggleExtraInfo() {
    showExtraPlayerInfoInRosteringTable = !showExtraPlayerInfoInRosteringTable;
    UpdateRosteringTableUIElements();
}
function OnSelectElementChanged(selectElement) {
    let team = Number(selectElement.id.split("-")[0]);
    let slot = Number(selectElement.id.split("-")[1]);
    let playerPosition = Number(selectElement.id.split("-")[2]);
    let playersInPosition = cbRoster.Players[team][slot][playerPosition];
    // For each player in position
    for (let j = 0; j < playersInPosition.length; j++) {
        let playerInPosition = playersInPosition[j];
        playerInPosition.Selected = false;
        // If select element value contains player IGN
        if (selectElement.value.toLowerCase().includes(playerInPosition.IGN.toLowerCase())) {
            playerInPosition.Selected = true;
        }
    }
    UpdateRosteringTableUIElements();
}
function UpdateRosteringTableUIElements() {
    UpdateTableWithRosterData();
    UpdateAssignedSlotsTrackerWithRosterData();
    UpdateSessionClanBaseHeader();
    UpdateRosteringTableCellColors();
    UpdateAllRosteringTableCellsWithPlayerData();
    UpdateUnrosterdPlayersTable();
}
function UpdateUnrosterdPlayersTable() {
    // TODO: FIX THIS
    return;
    // 1st layer - slot
    // 2nd layer - unselected players
    let unSelectedPlayersInSelectElements = [[], [], [], [], [], [], [], [], [], []];
    for (let slot = 0; slot < ALLSESSIONSLOTS.length; slot++) {
        let selectElementsInSlot_BlueAndRedTeams = [];
        for (let team = 0; team < ALLTEAMS.length; team++) {
            for (let playerPosition = 0; playerPosition < cbRoster.Players[team][slot].length; playerPosition++) {
                let selectElementID = team + "-" + slot + "-" + playerPosition;
                selectElementsInSlot_BlueAndRedTeams.push(document.getElementById(selectElementID));
            }
        }
        // Loop the select elements in slot
        for (let selectElement of selectElementsInSlot_BlueAndRedTeams) {
            // For each options in select element
            for (let option of selectElement.options) {
                // If option is not selected
                if (!option.selected) {
                    unSelectedPlayersInSelectElements[slot].push(option.value);
                }
            }
        }
        // Deduplicate unSelectedPlayersInSelectElements
        unSelectedPlayersInSelectElements[slot] = unSelectedPlayersInSelectElements[slot].filter((value, index, self) => self.indexOf(value) === index);
    }
    console.log(unSelectedPlayersInSelectElements);
}
function UpdateAllRosteringTableCellsWithPlayerData() {
    if (showExtraPlayerInfoInRosteringTable == false) {
        return;
    }
    var extraInfoCaller_HTMLTemplate = '<div class="extra-info extra-info-caller">CALLER</div>';
    var extraInfoEnterBtl_HTMLTemplate = '<div class="extra-info extra-info-startbtl">KEY</div>';
    var extraInfoNoSortie_HTMLTemplate = '<div class="extra-info extra-info-nosortie">NO SORTIE</div>';
    var extraInfoStartBlueTeam_HTMLTemplate = '<div class="extra-info extra-info-bluteam">BLUE</div>';
    var extraInfoStartRedTeam_HTMLTemplate = '<div class="extra-info extra-info-redteam">RED</div>';
    for (let team = 0; team < cbRoster.Players.length; team++) {
        for (let session = 0; session < cbRoster.Players[team].length; session++) {
            for (let playerSlot = 0; playerSlot < cbRoster.Players[team][session].length; playerSlot++) {
                // Get the selected player
                let playersInSlot = cbRoster.Players[team][session][playerSlot];
                // Get the player that is selected
                let selectedPlayer = playersInSlot.find(player => player.Selected);
                if (selectedPlayer == undefined) {
                    console.log("Error: No player selected");
                    continue;
                }
                selectedPlayer = selectedPlayer;
                // Get the parent of the select element
                let selectedElementID = team + "-" + session + "-" + playerSlot;
                // Get the select element
                let selectElement = document.getElementById(selectedElementID);
                if (selectElement == null || selectElement.parentElement == null) {
                    console.log("Error: Select element or it's parent is not found");
                    continue;
                }
                // Get the parent of the select element
                let parentElement = selectElement.parentElement;
                if (selectedPlayer.SortieDone == false) {
                    parentElement.prepend(CreateElementFromString(extraInfoNoSortie_HTMLTemplate));
                }
                if (selectedPlayer.PlayerType == PlayerTypes.CALLER) {
                    parentElement.prepend(CreateElementFromString(extraInfoCaller_HTMLTemplate));
                }
                if (selectedPlayer.EnterBattle == true) {
                    parentElement.prepend(CreateElementFromString(extraInfoEnterBtl_HTMLTemplate));
                }
                if (selectedPlayer.Team == TeamTypes.BLUE) {
                    parentElement.prepend(CreateElementFromString(extraInfoStartBlueTeam_HTMLTemplate));
                }
                if (selectedPlayer.Team == TeamTypes.RED) {
                    parentElement.prepend(CreateElementFromString(extraInfoStartRedTeam_HTMLTemplate));
                }
            }
        }
    }
}
function UpdateRosteringTableCellColors() {
    for (let slot = 0; slot < ALLSESSIONSLOTS.length; slot++) {
        let selectElementsInSlot_BlueAndRedTeams = [];
        for (let team = 0; team < ALLTEAMS.length; team++) {
            for (let playerPosition = 0; playerPosition < cbRoster.Players[team][slot].length; playerPosition++) {
                let selectElementID = team + "-" + slot + "-" + playerPosition;
                selectElementsInSlot_BlueAndRedTeams.push(document.getElementById(selectElementID));
            }
        }
        let selectedPlayersInSelectElements = [];
        // Loop the select elements in slot
        for (let selectElement of selectElementsInSlot_BlueAndRedTeams) {
            selectedPlayersInSelectElements.push(selectElement.value);
        }
        let selectedPlayersThatAppearedMoreThanOnce = GetDuplicateStrings(selectedPlayersInSelectElements);
        // Loop the select elements in slot
        for (let selectElement of selectElementsInSlot_BlueAndRedTeams) {
            // Get the parent element of the select element
            let parentElement = selectElement.parentElement;
            if (parentElement == null) {
                console.log("Error: parentElement is null");
                continue;
            }
            // If value of selectElement is found in selectedPlayersThatAppearedMoreThanOnce
            if (selectedPlayersThatAppearedMoreThanOnce.includes(selectElement.value) || selectElement.value.includes("[X] None")) {
                // Add a class to the parent element
                parentElement.classList.add("duplicate-player");
            }
        }
    }
}
function UpdateSessionClanBaseHeader() {
    for (let team = 0; team < cbRoster.Players.length; team++) {
        for (let session = 0; session < cbRoster.Players[team].length; session++) {
            // Clan base label header element id
            let clanBaseLabelHeaderElementId = team + "-" + session;
            // Get the clan base label header
            let clanBaseLabelHeader = document.getElementById(clanBaseLabelHeaderElementId);
            // Get list of players that are selected
            let playersInPosition = [];
            for (let playerPosition = 0; playerPosition < cbRoster.Players[team][session].length; playerPosition++) {
                for (let playerCandidate = 0; playerCandidate < cbRoster.Players[team][session][playerPosition].length; playerCandidate++) {
                    if (cbRoster.Players[team][session][playerPosition][playerCandidate].Selected) {
                        playersInPosition.push(cbRoster.Players[team][session][playerPosition][playerCandidate]);
                    }
                }
            }
            // Get list of clans from players in position
            let clansInPosition = playersInPosition.map(player => player.Clan);
            // Get the clans that appears the most in the list
            let mostCommonClan = GetMostOccuringString(clansInPosition);
            // Check if the mostCommonClan appears more than or equals to 4 times in the list
            if (mostCommonClan !== "X" && clansInPosition.filter(clan => clan === mostCommonClan).length >= 4) {
                // Set clan base label header
                clanBaseLabelHeader.innerText = mostCommonClan;
                // Remove class
                clanBaseLabelHeader.classList.remove("noBase");
            }
            else {
                // Set clan base label header
                clanBaseLabelHeader.innerText = "No Clan Base";
                // Add class
                clanBaseLabelHeader.classList.add("noBase");
            }
        }
    }
}
function UpdateAssignedSlotsTrackerWithRosterData() {
    var playerSlotDivaTemplate = '<div class="playerSlotContainer">IGN <div id="IDNAME">CURRSLOTSASSIGNED / MAXSLOTS</div></div>';
    // Clear the Assigned Slots Tracker div
    let assignedSlotsTracker_div = document.getElementById("assignedSlotsTracker-div");
    assignedSlotsTracker_div.innerHTML = "";
    // Loop through all players in cbRoster.assignedSlotsTracker
    for (let playerIndex = 0; playerIndex < cbRoster.PlayerSlotAssigments.length; playerIndex++) {
        // Player IGN
        let playerIGN = cbRoster.PlayerSlotAssigments[playerIndex].IGN;
        let playerMaxSessionsToAssign = cbRoster.PlayerSlotAssigments[playerIndex].MaxSessionsToAssign;
        let playerNumOfTimesAssigned = 0;
        // Get list of players in roster that matches the playerIGN
        for (let team = 0; team < cbRoster.Players.length; team++) {
            for (let session = 0; session < cbRoster.Players[team].length; session++) {
                for (let slot = 0; slot < cbRoster.Players[team][session].length; slot++) {
                    for (let candidate = 0; candidate < cbRoster.Players[team][session][slot].length; candidate++) {
                        if (cbRoster.Players[team][session][slot][candidate].IGN === playerIGN && cbRoster.Players[team][session][slot][candidate].Selected === true) {
                            playerNumOfTimesAssigned++;
                        }
                    }
                }
            }
        }
        let idName = "normal";
        if (playerNumOfTimesAssigned === 0) {
            idName = "not-rostered";
        }
        if (playerNumOfTimesAssigned > playerMaxSessionsToAssign) {
            idName = "over-rostered";
        }
        var tempPlayerSlotDiv = playerSlotDivaTemplate;
        tempPlayerSlotDiv = tempPlayerSlotDiv.replace("IDNAME", idName);
        tempPlayerSlotDiv = tempPlayerSlotDiv.replace("IGN", playerIGN);
        tempPlayerSlotDiv = tempPlayerSlotDiv.replace("CURRSLOTSASSIGNED", playerNumOfTimesAssigned.toString());
        tempPlayerSlotDiv = tempPlayerSlotDiv.replace("MAXSLOTS", playerMaxSessionsToAssign.toString());
        assignedSlotsTracker_div.innerHTML += tempPlayerSlotDiv;
    }
}
function UpdateTableWithRosterData() {
    // Clear the table body
    let rosterTable_blue = document.getElementById("rostering-table-blue");
    let rosterTable_red = document.getElementById("rostering-table-red");
    rosterTable_blue.tBodies[0].innerHTML = "";
    rosterTable_red.tBodies[0].innerHTML = "";
    let rosterIDs = ["rostering-table-blue", "rostering-table-red"];
    // Loop the teams
    for (let team = 0; team < ALLTEAMS.length; team++) {
        // Loop the playerPositions
        for (let playerPosition = 0; playerPosition < ALLPLAYERPOSITIONS.length; playerPosition++) {
            // Select elements for the table row
            let selectElements = [];
            // Loop the number of sessions
            for (let sessionSlot = 0; sessionSlot < ALLSESSIONSLOTS.length; sessionSlot++) {
                // Players available in player slot
                let playersAvailable = cbRoster.Players[team][sessionSlot][playerPosition];
                // Sort playersAvailable by their clan in alphabetical order
                playersAvailable.sort((a, b) => { return a.Clan.localeCompare(b.Clan); });
                let playersAvailable_clan = playersAvailable.map(player => player.Clan);
                let playersAvailable_ign = playersAvailable.map(player => player.IGN);
                let playersAvailable_clan_ign = [];
                for (let i = 0; i < playersAvailable_clan.length; i++) {
                    playersAvailable_clan_ign.push("[" + playersAvailable_clan[i] + "] " + playersAvailable_ign[i]);
                }
                let selectedPlayer_clan = playersAvailable.filter(player => player.Selected)[0].Clan;
                let selectedPlayer_ign = playersAvailable.filter(player => player.Selected)[0].IGN;
                let selectedPlayer_clan_ign = "[" + selectedPlayer_clan + "] " + selectedPlayer_ign;
                let selectElementID = team + "-" + sessionSlot + "-" + playerPosition;
                // Create a select element
                let selectElement = CreateSelectElement(playersAvailable_clan_ign, selectedPlayer_clan_ign, selectElementID, "tableSelect");
                // Add the select element to the array
                selectElements.push(selectElement);
            }
            // Add the select elements to the table row
            AddRowToTableAnyData(rosterIDs[team], selectElements);
        }
    }
}
function GenerateRosterData() {
    // Clear the roster data
    cbRoster.Players = [];
    cbRoster.PlayerSlotAssigments = [];
    // Add all players in playersOnboardArray to cbRosterData.PlayerSlotAssigments
    // Except players the remarks contains not participating, are duplicates, not found
    for (let i = 0; i < playersOnboardArray.length; i++) {
        let playerOnboard = playersOnboardArray[i];
        if (playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.NOT_PARTICIPATING) == -1 &&
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.DUPLICATE_ENTRY) == -1 &&
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.PLAYER_NOT_FOUND) == -1) {
            let newPlayerSlotsAssignedData = {
                IGN: playerOnboard.IGN,
                SessionsAssigned: 0,
                MaxSessionsToAssign: playerOnboard.MAX_SLOTS
            };
            cbRoster.PlayerSlotAssigments.push(newPlayerSlotsAssignedData);
        }
    }
    for (let team = 0; team < 2; team++) {
        cbRoster.Players[team] = [];
        // Initialize blue team and red team players arrays
        for (let i = 0; i < ALLSESSIONSLOTS.length; i++) {
            // Initialize 7 arrays for each session (Caller1, Caller2, Player1, Player2, Player3, Player4, Player5)
            cbRoster.Players[team][i] = [[], [], [], [], [], [], []];
        }
    }
    // For each session slot
    for (let sessionSlot = 0; sessionSlot < ALLSESSIONSLOTS.length; sessionSlot++) {
        // Store players that are available for this session slot
        let availablePlayers = [];
        // For each player in playersOnboardArray
        for (let i = 0; i < playersOnboardArray.length; i++) {
            let playerOnboard = playersOnboardArray[i];
            // If player ign is not found in cbRosterData.PlayerSlotAssigments
            if (cbRoster.PlayerSlotAssigments.find(x => x.IGN == playerOnboard.IGN) == undefined) {
                continue;
            }
            // If player's session slots selected doesnt contain the current session slot
            if (playerOnboard.SessionSlotsSelected.indexOf(ALLSESSIONSLOTS[sessionSlot]) == -1) {
                continue;
            }
            availablePlayers.push({
                Selected: false,
                IGN: playerOnboard.IGN,
                Clan: playerOnboard.Clan,
                PlayerType: playerOnboard.PlayerType,
                Team: playerOnboard.Team,
                EnterBattle: playerOnboard.EnterBattle,
                SortieDone: playerOnboard.SortieDone
            });
        }
        let caller1_candidates = [];
        let caller2_candidates = [];
        let player1_candidates = [];
        let player2_candidates = [];
        let player3_candidates = [];
        let player4_candidates = [];
        let player5_candidates = [];
        let emptyPlayer = {
            Selected: true,
            IGN: "None",
            Clan: "X",
            PlayerType: PlayerTypes.UNKNOWN,
            Team: TeamTypes.UNKNOWN,
            EnterBattle: false,
            SortieDone: false
        };
        caller1_candidates.push(emptyPlayer);
        caller2_candidates.push(emptyPlayer);
        player1_candidates.push(emptyPlayer);
        player2_candidates.push(emptyPlayer);
        player3_candidates.push(emptyPlayer);
        player4_candidates.push(emptyPlayer);
        player5_candidates.push(emptyPlayer);
        caller1_candidates = PushArray(caller1_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER));
        caller2_candidates = PushArray(caller2_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER));
        player1_candidates = PushArray(player1_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player2_candidates = PushArray(player2_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player3_candidates = PushArray(player3_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player4_candidates = PushArray(player4_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player5_candidates = PushArray(player5_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        // if any of the arrays are undefined, set them to empty array
        for (let team = 0; team < 2; team++) {
            cbRoster.Players[team][sessionSlot][0] = JSON.parse(JSON.stringify(caller1_candidates));
            cbRoster.Players[team][sessionSlot][1] = JSON.parse(JSON.stringify(caller2_candidates));
            cbRoster.Players[team][sessionSlot][2] = JSON.parse(JSON.stringify(player1_candidates));
            cbRoster.Players[team][sessionSlot][3] = JSON.parse(JSON.stringify(player2_candidates));
            cbRoster.Players[team][sessionSlot][4] = JSON.parse(JSON.stringify(player3_candidates));
            cbRoster.Players[team][sessionSlot][5] = JSON.parse(JSON.stringify(player4_candidates));
            cbRoster.Players[team][sessionSlot][6] = JSON.parse(JSON.stringify(player5_candidates));
        }
    }
}
// Function to updat the table with the player details
function UpdateTableWithPlayerDetails() {
    // Clear table body
    ClearTableBody("playerDetails-table");
    // Loop through the inputPlayerDetailsArray
    for (let i = 0; i < inputPlayerDetailsArray.length; i++) {
        // Get the current player detail
        let playerDetail = inputPlayerDetailsArray[i];
        let rowData = [];
        rowData.push(playerDetail.IGN);
        rowData.push(playerDetail.Clan);
        rowData.push(playerDetail.PlayerType);
        rowData.push(playerDetail.Team);
        rowData.push(playerDetail.EnterBattle ? "YES" : "");
        rowData.push(playerDetail.SortieDone ? "YES" : "");
        AddRowToTable("playerDetails-table", rowData);
    }
}
// Function to update the table with the input CBResponses
function UpdateTableWithCBResponses() {
    // Clear table body
    ClearTableBody("cbResponses-table");
    // Loop through the inputCBResponseArray and create a row for each
    for (let i = 0; i < inputCBResponseArray.length; i++) {
        let rowData = [];
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
function ParseInputCBResponseString(inputString) {
    // Clear the inputCBResponseArray
    inputCBResponseArray = [];
    // Split the string into an array of strings
    let inputStringArray = inputString.split("\n");
    // Loop through the array of strings
    for (let i = 0; i < inputStringArray.length; i++) {
        // Split the string into an array of strings
        let inputStringArray2 = inputStringArray[i].split("\t");
        // Create a new CBResponse object
        let newCBResponse = {
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
function ParseInputPlayerDetailsString(inputString) {
    // Clear the inputPlayerDetailsArray
    inputPlayerDetailsArray = [];
    // Split the string into an array of strings
    let inputStringArray = inputString.split("\n");
    // Loop through the array of strings
    for (let i = 0; i < inputStringArray.length; i++) {
        // Split the string into an array of strings
        let inputStringArray2 = inputStringArray[i].split("\t");
        // Create a new PlayerDetail object
        let newPlayerDetail = {
            IGN: inputStringArray2[0],
            Clan: inputStringArray2[1],
            PlayerType: inputStringArray2[2] == "CALLER" ? PlayerTypes.CALLER : PlayerTypes.PLAYER,
            Team: inputStringArray2[3] == "RED" ? TeamTypes.RED : TeamTypes.BLUE,
            EnterBattle: inputStringArray2[4] == "YES" ? true : false,
            SortieDone: inputStringArray2[5] == "YES" ? true : false
        };
        // Add the new PlayerDetail object to the inputPlayerDetailsArray
        inputPlayerDetailsArray.push(newPlayerDetail);
    }
}
// Function to create the playersOnboardArray
function GeneratePlayersOnboardArray() {
    // Clear the playersOnboardArray
    playersOnboardArray = [];
    // Loop through the inputCBResponseArray
    for (let i = 0; i < inputCBResponseArray.length; i++) {
        let IGN = inputCBResponseArray[i].IGN;
        let clan = "";
        let playerType = PlayerTypes.UNKNOWN;
        let team = TeamTypes.UNKNOWN;
        let enterBattle = false;
        let sortieDone = false;
        let playerRemarks = [];
        let sessionSlotsSelected = [];
        // Check if playerIGN does not exist in inputPlayerDetailsArray
        // Ignore case when comparing
        if (!inputPlayerDetailsArray.some(x => x.IGN.toLowerCase() == IGN.toLowerCase())) {
            // Add the player not found remark to the playerRemarks array
            playerRemarks.push(PlayerRemarks.PLAYER_NOT_FOUND);
        }
        else {
            // Get the player object from the inputPlayerDetailsArray
            // Ignore case when getting the object
            let player = inputPlayerDetailsArray.filter(x => x.IGN.toLowerCase() == IGN.toLowerCase())[0];
            // Set the clan, playerType, team and enterBattle
            clan = player.Clan;
            playerType = player.PlayerType;
            team = player.Team;
            enterBattle = player.EnterBattle;
            sortieDone = player.SortieDone;
            if (player.SortieDone == false) {
                playerRemarks.push(PlayerRemarks.DID_NOT_DO_SORTIE);
            }
        }
        // Check if playerIGN appears more than once in inputCBResponseArray
        if (inputCBResponseArray.filter(x => x.IGN == IGN).length > 1) {
            // Add the duplicate entry remark to the playerRemarks array
            playerRemarks.push(PlayerRemarks.DUPLICATE_ENTRY);
        }
        inputCBResponseArray[i].WED_1 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[0]) : null;
        inputCBResponseArray[i].WED_2 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[1]) : null;
        inputCBResponseArray[i].THU_1 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[2]) : null;
        inputCBResponseArray[i].THU_2 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[3]) : null;
        inputCBResponseArray[i].SAT_1 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[4]) : null;
        inputCBResponseArray[i].SAT_2 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[5]) : null;
        inputCBResponseArray[i].SUN_M_1 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[6]) : null;
        inputCBResponseArray[i].SUN_M_2 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[7]) : null;
        inputCBResponseArray[i].SUN_N_1 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[8]) : null;
        inputCBResponseArray[i].SUN_N_2 ? sessionSlotsSelected.push(ALLSESSIONSLOTS[9]) : null;
        // Check if player does not have any days available
        if (sessionSlotsSelected.length == 0) {
            // Add the no days available remark to the playerRemarks array
            playerRemarks.push(PlayerRemarks.NOT_PARTICIPATING);
        }
        // Create a new PlayerOnboard object
        let newPlayerOnboard = {
            IGN: IGN,
            Clan: clan,
            PlayerType: playerType,
            Team: team,
            EnterBattle: enterBattle,
            SessionSlotsSelected: sessionSlotsSelected,
            MAX_SLOTS: inputCBResponseArray[i].MAX_SLOTS,
            PlayerRemarks: playerRemarks,
            SortieDone: sortieDone
        };
        // Push the new PlayerOnboard object to the playersOnboardArray
        playersOnboardArray.push(newPlayerOnboard);
    }
}
// Function to update the table with the playersOnboardArray
function UpdateTableWithPlayersOnboardArray() {
    // Clear the table body
    ClearTableBody("playersOnBoard-table");
    // Loop through the playersOnboardArray
    for (let i = 0; i < playersOnboardArray.length; i++) {
        // Create a new rowData array
        let rowData = [];
        let PlayerIGN = playersOnboardArray[i].IGN;
        let PlayerType = playersOnboardArray[i].PlayerType == PlayerTypes.CALLER ? "CALLER" : "PLAYER";
        let Team = playersOnboardArray[i].Team == TeamTypes.RED ? "RED" : "BLUE";
        let EnterBattle = playersOnboardArray[i].EnterBattle == true ? "YES" : "";
        let Clan = playersOnboardArray[i].Clan;
        let Remarks = "";
        let MAX_SLOTS = playersOnboardArray[i].MAX_SLOTS.toString();
        let ResponseData_WED_1 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[0]) == true ? "X" : "";
        let ResponseData_WED_2 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[1]) == true ? "X" : "";
        let ResponseData_THU_1 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[2]) == true ? "X" : "";
        let ResponseData_THU_2 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[3]) == true ? "X" : "";
        let ResponseData_SAT_1 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[4]) == true ? "X" : "";
        let ResponseData_SAT_2 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[5]) == true ? "X" : "";
        let ResponseData_SUN_M_1 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[6]) == true ? "X" : "";
        let ResponseData_SUN_M_2 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[7]) == true ? "X" : "";
        let ResponseData_SUN_N_1 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[8]) == true ? "X" : "";
        let ResponseData_SUN_N_2 = playersOnboardArray[i].SessionSlotsSelected.includes(ALLSESSIONSLOTS[9]) == true ? "X" : "";
        // If player remarks length is greater than 0
        if (playersOnboardArray[i].PlayerRemarks.length > 0) {
            // For each player remarks
            for (let j = 0; j < playersOnboardArray[i].PlayerRemarks.length; j++) {
                // Get the enum value as a string
                let playerRemarksString = playersOnboardArray[i].PlayerRemarks[j].toString();
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
        if (ItemAppearsInArray(PlayerRemarks.NOT_PARTICIPATING, playersOnboardArray[i].PlayerRemarks) == true) {
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
// *********** UTILITY FUNCTIONS ***********
// Function that finds an item in the array
// Takes in an array
// Returns the item in the array
function FindItemInArray(item, array) {
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
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
function ItemAppearsInArray(item, array) {
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
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
function ItemAppearsMoreThanOnceInArray(item, array) {
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
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
function AddRowToTableAnyData(tableId, rowData, cellIDs = [], rowClass = "") {
    // Get the table
    let table = document.getElementById(tableId);
    // Get the table body
    let tableBody = table.tBodies[0];
    // Create a new row
    let newRow = document.createElement("tr");
    // If row class is not empty
    if (rowClass != "") {
        // Set the row class
        newRow.className = rowClass;
    }
    // For each row data
    for (let i = 0; i < rowData.length; i++) {
        // Create a new cell
        let newCell = document.createElement("td");
        newCell.appendChild(rowData[i]);
        if (cellIDs.length > 0) {
            newCell.id = cellIDs[i];
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
function AddRowToTable(tableID, rowData, classToAdd = "") {
    // Get the table
    let table = document.getElementById(tableID);
    // Check if table is null
    if (table == null) {
        // Log the error
        console.log("Table with id " + tableID + " does not exist");
        return;
    }
    // Check if table has table body
    if (table.tBodies.length == 0) {
        // Create a new table body
        let tBody = document.createElement("tbody");
        // Add the table body to the table
        table.appendChild(tBody);
    }
    // Create a new row
    let row = document.createElement("tr");
    // Loop through the rowData array
    for (let i = 0; i < rowData.length; i++) {
        // Create a new cell
        let cell = document.createElement("td");
        // Add the cell to the row
        row.appendChild(cell);
        // Add the rowData to the cell
        cell.innerHTML = rowData[i];
    }
    // Add the class to the row items if it is not empty
    if (classToAdd != "") {
        // Loop through the row items
        for (let i = 0; i < row.childElementCount; i++) {
            // Add the class to the row item
            row.children[i].classList.add(classToAdd);
        }
    }
    // Add the row to the table body
    table.tBodies[0].appendChild(row);
}
// Function that creates a select element
// Takes in a list of string to be added to the select element
// Takes in the option to be selected
// Takes in the id of the select element
// Takes in a string (element class) (optional) to be added to the select element
// Returns the select element
function CreateSelectElement(list, optionToSelect, id, classToAdd = "") {
    // Create a new select element
    let selectElement = document.createElement("select");
    // Loop through the list
    for (let i = 0; i < list.length; i++) {
        // Create a new option
        let option = document.createElement("option");
        // Set the option value
        option.value = list[i];
        // Set the option text
        option.text = list[i];
        // Add the option to the select element
        selectElement.appendChild(option);
    }
    // If the class to add is not empty
    if (classToAdd != "") {
        // Add the class to the select element
        selectElement.classList.add(classToAdd);
    }
    // Set the select element id
    selectElement.id = id;
    // Set the selected option
    selectElement.value = optionToSelect;
    // Add the on change function
    selectElement.onchange = function () { OnSelectElementChanged(selectElement); };
    // Return the select element
    return selectElement;
}
// Function to toggle div visibility
// Takes in an element id
// Toggle between none and block
function ToggleDivVisibility(elementId) {
    // Get the element
    let element = document.getElementById(elementId);
    // If the element is found
    if (element != null) {
        // If the element is visible
        if (element.style.display == "block") {
            // Hide the element
            element.style.display = "none";
        }
        else {
            // Show the element
            element.style.display = "block";
        }
    }
    else {
        // Log the error
        console.log("Element with id " + elementId + " does not exist");
    }
}
// Function to toggle table visibility
// Takes in an table id
// Toggle between none and block
// Toggle visiblity of the parent element
function ToggleTableVisibility(tableID) {
    // Get the table
    let table = document.getElementById(tableID);
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
// Function to clear table body
// Takes in an table id
function ClearTableBody(tableID) {
    // Get the table
    let table = document.getElementById(tableID);
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
// Function to push an array of elements to an array
// Takes in array to be pushed to
// Takes in an array of items to push
// Returns the array with the items pushed
function PushArray(array, items) {
    // Loop through the items
    for (let i = 0; i < items.length; i++) {
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
function FilterArray_4Dimension(array, value) {
    // Create a new array
    let newArray = [];
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
        // Loop through the array
        for (let j = 0; j < array[i].length; j++) {
            // Loop through the array
            for (let k = 0; k < array[i][j].length; k++) {
                // Loop through the array
                for (let l = 0; l < array[i][j][k].length; l++) {
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
function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Function that takes in an array of strings
// Takes in an occurance count parameter
// Finds out which string has the highest occurance count
// Returns the string with the highest occurance count
function GetMostOccuringString(array) {
    // Create a new array
    let newArray = [];
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
        // If the array item is not in the new array
        if (newArray.indexOf(array[i]) == -1) {
            // Push the array item to the new array
            newArray.push(array[i]);
        }
    }
    // Create a new variable to hold the highest occurance count
    let highestOccuranceCount = 0;
    // Create a new variable to hold the most occuring string
    let mostOccuringString = "";
    // Loop through the new array
    for (let i = 0; i < newArray.length; i++) {
        // Create a new variable to hold the occurance count
        let occuranceCount = 0;
        // Loop through the array
        for (let j = 0; j < array.length; j++) {
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
function GetDuplicateStrings(array) {
    // Create a new array
    let newArray = [];
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
        // If the array item is not in the new array
        if (newArray.indexOf(array[i]) == -1) {
            // Push the array item to the new array
            newArray.push(array[i]);
        }
    }
    // Create a new array
    let duplicateArray = [];
    // Loop through the new array
    for (let i = 0; i < newArray.length; i++) {
        // Create a new variable to hold the occurance count
        let occuranceCount = 0;
        // Loop through the array
        for (let j = 0; j < array.length; j++) {
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
function CreateElementFromString(string) {
    return new DOMParser().parseFromString(string, "text/html").body.firstChild;
}
function LoadSampleData() {
    let inputCBResponses_textarea = document.getElementById("inputCBResponses-textarea");
    inputCBResponses_textarea.textContent = sample_csv_inputCBResponses;
    let inputPlayerDetails_textArea = document.getElementById("inputPlayerDetails-textarea");
    inputPlayerDetails_textArea.textContent = sample_csv_inputPlayerDetails;
    OnBtnClick_LoadCBResponses();
    OnBtnClick_LoadPlayerDetails();
    OnBtnClick_GeneratePlayersOnboard();
    OnBtnClick_GenerateRosteringTable();
}
//# sourceMappingURL=script.js.map