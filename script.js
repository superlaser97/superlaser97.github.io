"use strict";
//# sourceMappingURL=E:\_Stuff\Projects\superlaser97.github.io\script.js.map
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
    PlayerRemarks["DID_NOT_SUBMIT"] = "DID NOT SUBMIT";
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
    "RED",
    "CASUAL"
];
const ALLTEAMS_PLAYERCOUNT = [
    7,
    7,
    2
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
    TryLoadDataFromLastSession();
}
function OnBtnClick_LoadCBResponses() {
    // Get the input string from the textarea
    let textArea = document.getElementById("inputCBResponses-textarea");
    ParseInputCBResponseString(textArea.value);
    UpdateTableWithCBResponses();
    // Save the data to local storage
    localStorage.setItem("inputCBResponses", textArea.value);
}
function OnBtnClick_LoadPlayerDetails() {
    // Get the input string from the textarea
    let textArea = document.getElementById("inputPlayerDetails-textarea");
    ParseInputPlayerDetailsString(textArea.value);
    UpdateTableWithPlayerDetails();
    // Save the data to local storage
    localStorage.setItem("inputPlayerDetails", textArea.value);
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
    // Check if cbRoster is empty
    if (cbRoster.Players.length == 0) {
        alert("cbRoster is empty. Please generate roster data first.");
        return;
    }
    ImportRosterDataFromTextbox();
    UpdateRosteringTableUIElements();
    ExportRosterDataToTextbox();
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
    ExportRosterDataToTextbox();
}
function OnSelectElementHovered(selectElement) {
    // Get the selected value of the select element
    let selectedValue = selectElement.value;
    selectedValue = selectedValue.replace(/\[.*\] /g, "");
    if (selectedValue === "None") {
        return;
    }
    // Get the player detail that IGN matches the selected value
    // Selected value contains the clan tag, so we need to remove it
    let playerDetail = inputPlayerDetailsArray.find(x => x.IGN.toLowerCase() === selectedValue.toLowerCase());
    if (playerDetail === undefined) {
        console.log("Player detail not found for IGN: " + selectedValue);
        return;
    }
    playerDetail = playerDetail;
    if (playerDetail.Remarks === "") {
        return;
    }
    // Get the hover element
    let hoverElement = document.getElementById("tooltipContainer");
    // Replace line break in playerDetail.remarks with <br>
    let playerDetailRemarks = playerDetail.Remarks.replace("\n", "<br>");
    hoverElement.innerHTML = playerDetailRemarks;
    hoverElement.style.display = "block";
}
function OnSelectElementUnhovered() {
    // Get the hover element
    let hoverElement = document.getElementById("tooltipContainer");
    hoverElement.style.display = "none";
}
function OnCellClicked(cell) {
    // Get the select element
    let selectElement = cell.getElementsByTagName("select")[0];
    // Get the textbox element
    let textboxElement = cell.getElementsByTagName("input")[0];
    // If select element display is none
    if (selectElement.style.display === "none") {
        // Show the select element
        selectElement.style.display = "block";
        // Hide the textbox element
        textboxElement.style.display = "none";
    }
    else {
        // Hide the select element
        selectElement.style.display = "none";
        // Show the textbox element
        textboxElement.style.display = "block";
    }
}
function OnBtnClick_Reset() {
    // Clear local storage
    localStorage.clear();
    // Refresh the page
    location.reload();
}
function ShowUnrosteredPlayers(sessionIndex) {
    let unrosteredPlayerPanel = document.getElementById("unrosteredPlayersPanel");
    if (!unrosteredPlayerPanel) {
        console.log("unrosteredPlayerPanel is null");
        return;
    }
    unrosteredPlayerPanel.style.display = "block";
    let unrosteredPlayers_List = unrosteredPlayerPanel.getElementsByClassName("unrosteredPlayers_List")[0];
    if (!unrosteredPlayers_List) {
        console.log("unrosteredPlayers_List is null");
        return;
    }
    unrosteredPlayers_List = unrosteredPlayers_List;
    unrosteredPlayers_List.innerHTML = "";
    // Get players that are not selected from a specific session
    let rosteredPlayers = [];
    let playersInSession = [];
    let sessionIndexNumber = Number(sessionIndex);
    // Loop cbRoster.Players
    for (let team = 0; team < cbRoster.Players.length; team++) {
        let sessionTarget = cbRoster.Players[team][sessionIndexNumber];
        for (let playerCandidates = 0; playerCandidates < sessionTarget.length; playerCandidates++) {
            let playerCandidatesInSlot = sessionTarget[playerCandidates];
            // For each player in slot
            for (let j = 0; j < playerCandidatesInSlot.length; j++) {
                let playerCandidate = playerCandidatesInSlot[j];
                playersInSession.push("[" + playerCandidate.Clan + "] " + playerCandidate.IGN);
                if (playerCandidate.Selected) {
                    rosteredPlayers.push("[" + playerCandidate.Clan + "] " + playerCandidate.IGN);
                }
            }
        }
    }
    // Deduplicate rostered players
    rosteredPlayers = rosteredPlayers.filter((value, index, self) => self.indexOf(value) === index);
    // Deduplicate all players in session
    playersInSession = playersInSession.filter((value, index, self) => self.indexOf(value) === index);
    // remove "None" from playersInSession
    playersInSession.splice(playersInSession.indexOf("[X] None"), 1);
    // Remove players from playerInSession that appears in rosteredPlayers
    // And save them in unrosteredPlayers
    let unrosteredPlayers = playersInSession.filter(x => !rosteredPlayers.includes(x));
    let elementsToInsert = [];
    // For each unrostered player
    for (let i = 0; i < unrosteredPlayers.length; i++) {
        let elementTemplate = `<div class="unrosteredPlayer">[CLAN] PLAYER</div>`;
        elementTemplate = elementTemplate.replace("[CLAN]", unrosteredPlayers[i].split(" ")[0]);
        elementTemplate = elementTemplate.replace("PLAYER", unrosteredPlayers[i].split(" ")[1]);
        elementsToInsert.push(CreateElementFromString(elementTemplate));
    }
    // foreach element in elementsToInsert
    for (let i = 0; i < elementsToInsert.length; i++) {
        unrosteredPlayers_List.appendChild(elementsToInsert[i]);
    }
}
function ImportRosterDataFromTextbox() {
    let roster_textarea = document.getElementById("export-import-rosteringtable-textarea");
    let backupCBRoster = { SelectedPlayers: [] };
    // Try to parse the string
    try {
        backupCBRoster = JSON.parse(roster_textarea.value);
    }
    catch (e) {
        alert("Error parsing roster data. Please make sure the data is valid.");
        return;
    }
    // Restore the roster data
    // Iterate over cbRoster.Players
    // Team
    for (let teamIndex = 0; teamIndex < cbRoster.Players.length; teamIndex++) {
        // Session
        for (let sessionIndex = 0; sessionIndex < cbRoster.Players[teamIndex].length; sessionIndex++) {
            // Player Candidates
            for (let playerIndex = 0; playerIndex < cbRoster.Players[teamIndex][sessionIndex].length; playerIndex++) {
                // All player candidates
                let playerInSlots = cbRoster.Players[teamIndex][sessionIndex][playerIndex];
                // Iterate over playerInSlots
                for (let playerInSlotIndex = 0; playerInSlotIndex < playerInSlots.length; playerInSlotIndex++) {
                    playerInSlots[playerInSlotIndex].Selected = false;
                    if (backupCBRoster.SelectedPlayers[teamIndex][sessionIndex][playerIndex] === playerInSlots[playerInSlotIndex].IGN) {
                        playerInSlots[playerInSlotIndex].Selected = true;
                    }
                }
                // Check if there are no players that are selected
                if (playerInSlots.filter(player => player.Selected).length === 0) {
                    // Set the last player as selected
                    playerInSlots[playerInSlots.length - 1].Selected = true;
                }
            }
        }
    }
}
function ExportRosterDataToTextbox() {
    let roster_textarea = document.getElementById("export-import-rosteringtable-textarea");
    let backupCBRoster = { SelectedPlayers: [] };
    // Iterate over cbRoster.Players and get the selected players
    for (let teamIndex = 0; teamIndex < cbRoster.Players.length; teamIndex++) {
        backupCBRoster.SelectedPlayers[teamIndex] = [];
        for (let sessionIndex = 0; sessionIndex < cbRoster.Players[teamIndex].length; sessionIndex++) {
            backupCBRoster.SelectedPlayers[teamIndex][sessionIndex] = [];
            for (let playerIndex = 0; playerIndex < cbRoster.Players[teamIndex][sessionIndex].length; playerIndex++) {
                let playerInSlots = cbRoster.Players[teamIndex][sessionIndex][playerIndex];
                // For each player in the slot, check if they are selected
                for (let playerInSlotIndex = 0; playerInSlotIndex < playerInSlots.length; playerInSlotIndex++) {
                    if (playerInSlots[playerInSlotIndex].Selected) {
                        backupCBRoster.SelectedPlayers[teamIndex][sessionIndex].push(playerInSlots[playerInSlotIndex].IGN);
                    }
                }
            }
        }
    }
    roster_textarea.value = JSON.stringify(backupCBRoster);
    localStorage.setItem("selectedPlayers", roster_textarea.value);
}
function UpdateRosteringTableUIElements() {
    UpdateTableWithRosterData();
    UpdateAssignedSlotsTrackerWithRosterData();
    UpdateSessionClanBaseHeader();
    UpdateRosteringTableCellColors();
    UpdateAllRosteringTableCellsWithPlayerData();
}
function UpdateAllRosteringTableCellsWithPlayerData() {
    if (showExtraPlayerInfoInRosteringTable == false) {
        return;
    }
    var extraInfoCaller_HTMLTemplate = '<div class="extra-info extra-info-caller">CALLER</div>';
    var extraInfoEnterBtl_HTMLTemplate = '<div class="extra-info extra-info-startbtl">BTL</div>';
    var extraInfoNoSortie_HTMLTemplate = '<div class="extra-info extra-info-nosortie">NO SORTIE</div>';
    var extraInfoStartBlueTeam_HTMLTemplate = '<div class="extra-info extra-info-bluteam">BLUE</div>';
    var extraInfoStartRedTeam_HTMLTemplate = '<div class="extra-info extra-info-redteam">RED</div>';
    var extraInfoShipProf_HTMLTemplate = '<div class="extra-info extra-info-shipprof">XXX</div>';
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
                if (selectedPlayer.ShipProfessency !== "") {
                    let extraInfoShipProf = extraInfoShipProf_HTMLTemplate;
                    extraInfoShipProf = extraInfoShipProf_HTMLTemplate.replace("XXX", selectedPlayer.ShipProfessency);
                    parentElement.prepend(CreateElementFromString(extraInfoShipProf));
                }
                if (selectedPlayer.SortieDone == false && selectedPlayer.IGN !== "None") {
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
            // or select element doesn't contain the value of a empty player
            if (selectedPlayersThatAppearedMoreThanOnce.includes(selectElement.value) || selectElement.value.includes("[X] None")) {
                // And showExtraPlayerInfoInRosteringTable is true
                if (showExtraPlayerInfoInRosteringTable) {
                    // Add a class to the parent element
                    parentElement.classList.add("duplicate-player");
                }
            }
        }
    }
}
function UpdateSessionClanBaseHeader() {
    for (let team = 0; team < cbRoster.Players.length; team++) {
        if (team > 1) {
            return;
        }
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
    // Clear the Assigned Slots Tracker div
    let assignedSlotsTracker_div = document.getElementById("assignedSlotsTracker-div");
    assignedSlotsTracker_div.innerHTML = "";
    // Loop through all players in cbRoster.assignedSlotsTracker
    for (let playerIndex = 0; playerIndex < cbRoster.PlayerSlotAssigments.length; playerIndex++) {
        // Player IGN
        let playerIGN = cbRoster.PlayerSlotAssigments[playerIndex].IGN;
        let playerClan = cbRoster.PlayerSlotAssigments[playerIndex].Clan;
        let playerIGNwithClan = "[" + playerClan + "] " + playerIGN;
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
        // New playerSlotContainer element
        let playerSlotContainer = document.createElement("div");
        playerSlotContainer.innerText = playerIGN;
        playerSlotContainer.classList.add("playerSlotContainer");
        playerSlotContainer.onclick = () => { HighlightAllSelectElementsWithPlayer(playerIGNwithClan); };
        // New inner div element
        let innerDiv = document.createElement("div");
        innerDiv.id = idName;
        innerDiv.innerText = playerNumOfTimesAssigned.toString() + "/" + playerMaxSessionsToAssign.toString();
        // Append inner div to playerSlotContainer
        playerSlotContainer.appendChild(innerDiv);
        // Append playerSlotContainer to assignedSlotsTracker_div
        assignedSlotsTracker_div.appendChild(playerSlotContainer);
    }
}
function UpdateTableWithRosterData() {
    let rosteringTableIDs = ["rostering-table-blue", "rostering-table-red", "rostering-table-casual"];
    // Clear the table body
    let rosterTable_blue = document.getElementById(rosteringTableIDs[0]);
    let rosterTable_red = document.getElementById(rosteringTableIDs[1]);
    let rosterTable_casual = document.getElementById(rosteringTableIDs[2]);
    rosterTable_blue.tBodies[0].innerHTML = "";
    rosterTable_red.tBodies[0].innerHTML = "";
    rosterTable_casual.tBodies[0].innerHTML = "";
    // Loop the teams
    for (let team = 0; team < ALLTEAMS.length; team++) {
        // Loop the playerPositions
        for (let playerPosition = 0; playerPosition < ALLPLAYERPOSITIONS.length; playerPosition++) {
            // Select elements for the table row
            let elementsToAdd = [];
            // Loop the number of sessions
            for (let sessionSlot = 0; sessionSlot < ALLSESSIONSLOTS.length; sessionSlot++) {
                if (playerPosition >= ALLTEAMS_PLAYERCOUNT[team]) {
                    continue;
                }
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
                // Create a textebox element
                let textboxElement = CreateTextboxElement("overrideTextbox");
                textboxElement.style.display = "none";
                // Add the select element to the array
                elementsToAdd.push([selectElement, textboxElement]);
            }
            let callerCellClass = "callerCell";
            let classToAddToCell = "";
            if (playerPosition == 0 || playerPosition == 1) {
                classToAddToCell = callerCellClass;
            }
            // Add the select elements to the table row
            AddRowToTableAnyData_ForRosteringTable(rosteringTableIDs[team], elementsToAdd, classToAddToCell);
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
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.PLAYER_NOT_FOUND) == -1 &&
            playerOnboard.PlayerRemarks.indexOf(PlayerRemarks.DID_NOT_SUBMIT) == -1) {
            let numOfWatchesAvail = playerOnboard.SessionSlotsSelected.length;
            let maxWatchesRequested = playerOnboard.MAX_SLOTS;
            let numOfWatchesToGive = 0;
            if (numOfWatchesAvail < maxWatchesRequested) {
                numOfWatchesToGive = numOfWatchesAvail;
            }
            else {
                numOfWatchesToGive = maxWatchesRequested;
            }
            let newPlayerSlotsAssignedData = {
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
    for (let team = 0; team < ALLTEAMS.length; team++) {
        cbRoster.Players[team] = [];
        for (let session = 0; session < ALLSESSIONSLOTS.length; session++) {
            // Initialize blue team, red team and casual team players arrays
            cbRoster.Players[team][session] = [];
            cbRoster.Players[team][session] = [];
            cbRoster.Players[team][session] = [];
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
                SortieDone: playerOnboard.SortieDone,
                ShipProfessency: playerOnboard.ShipProfessency
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
        caller1_candidates = PushArray(caller1_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER));
        caller2_candidates = PushArray(caller2_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER));
        player1_candidates = PushArray(player1_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player2_candidates = PushArray(player2_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player3_candidates = PushArray(player3_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player4_candidates = PushArray(player4_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        player5_candidates = PushArray(player5_candidates, availablePlayers.filter(x => x.PlayerType == PlayerTypes.CALLER || x.PlayerType == PlayerTypes.PLAYER));
        let allPlayerCandidates = [caller1_candidates, caller2_candidates, player1_candidates, player2_candidates, player3_candidates, player4_candidates, player5_candidates];
        for (let team = 0; team < ALLTEAMS.length; team++) {
            for (let memberCount = 0; memberCount < ALLTEAMS_PLAYERCOUNT[team]; memberCount++) {
                cbRoster.Players[team][sessionSlot][memberCount] = JSON.parse(JSON.stringify(allPlayerCandidates[memberCount]));
            }
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
        rowData.push(playerDetail.ShipProfessency);
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
    let inputStringArray = CSVToArray(inputString, "\t");
    // Loop through the array of strings
    for (let i = 0; i < inputStringArray.length; i++) {
        // Create a new PlayerDetail object
        let newPlayerDetail = {
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
function GeneratePlayersOnboardArray() {
    // Clear the playersOnboardArray
    playersOnboardArray = [];
    // Loop through the inputCBResponseArray
    for (let i = 0; i < inputCBResponseArray.length; i++) {
        // If player ign is not found in inputplayerdetailsarray, add it to the playersOnboardArray with PLAYER_NOT_FOUND remark
        if (inputPlayerDetailsArray.findIndex(x => x.IGN == inputCBResponseArray[i].IGN) == -1) {
            let newPlayerOnboard = {
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
    for (let i = 0; i < inputPlayerDetailsArray.length; i++) {
        // Create a new PlayerOnboard object
        let newPlayerOnboard = {
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
        if (currInputCBResponse != undefined) {
            currInputCBResponse = currInputCBResponse;
            // If the same IGN appears more than once in inputcbResponseArray
            if (inputCBResponseArray.filter(x => x.IGN.toLowerCase() == newPlayerOnboard.IGN.toLowerCase()).length > 1) {
                newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.DUPLICATE_ENTRY);
            }
            if (newPlayerOnboard.SortieDone == false) {
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
            if (newPlayerOnboard.SessionSlotsSelected.length == 0 || newPlayerOnboard.MAX_SLOTS == 0) {
                newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.NOT_PARTICIPATING);
            }
        }
        else {
            newPlayerOnboard.PlayerRemarks.push(PlayerRemarks.DID_NOT_SUBMIT);
        }
        playersOnboardArray.push(newPlayerOnboard);
    }
    // sort the playersOnboardArray by the IGN ignoring case
    playersOnboardArray.sort((a, b) => a.IGN.toLowerCase() > b.IGN.toLowerCase() ? 1 : -1);
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
        let ShipProfessency = playersOnboardArray[i].ShipProfessency;
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
function CloseCustomSelectWindow() {
    let selectMenu = document.getElementById("CustomSelectWindow");
    let selectOverlayParent = selectMenu.parentElement;
    if (selectOverlayParent != null) {
        selectOverlayParent.style.display = "none";
    }
    // Disable document scroll
    //document.body.style.overflow = 'auto';
}
function SetDivDisplayToNone(panelToUnhide) {
    // Get the div by the panelToUnhide (id)
    let divToUnhide = document.getElementById(panelToUnhide);
    // Set the div display to none
    divToUnhide.style.display = "none";
}
function HighlightAllSelectElementsWithPlayer(playerIGNWithClan) {
    // Get all select elements that has class tableSelect
    let tableSelectElements = document.getElementsByClassName("tableSelect");
    // Loop through the tableSelectElements
    for (let i = 0; i < tableSelectElements.length; i++) {
        let tableSelectElement = tableSelectElements[i];
        // If "purpleBackground" class is present
        if (tableSelectElement.classList.contains("purpleBackground") == true) {
            // Remove the "purpleBackground" class
            tableSelectElement.classList.remove("purpleBackground");
            tableSelectElement.classList.remove("animate__animated");
            tableSelectElement.classList.remove("animate__heartBeat");
        }
        // If selected option is the same as the playerIGNWithClan
        if (tableSelectElement.value == playerIGNWithClan && playerIGNWithClan !== "[X] None") {
            // Add the "purpleBackground" class
            tableSelectElement.classList.add("purpleBackground");
            tableSelectElement.classList.add("animate__animated");
            tableSelectElement.classList.add("animate__heartBeat");
        }
    }
}
function OpenCustomSelectMenu(selectElement) {
    // Disable document scroll
    //document.body.style.overflow = 'hidden';
    // Get the select menu
    let selectMenu = document.getElementById("CustomSelectWindow");
    // Get select element global position relative to the screen
    let selectElement_topPos = selectElement.getBoundingClientRect().top;
    let selectElement_leftPos = selectElement.getBoundingClientRect().left;
    // Get width and height of display
    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;
    console.log("selectElement_topPos: " + selectElement_topPos);
    console.log("selectElement_leftPos: " + selectElement_leftPos);
    if (displayWidth - selectElement_leftPos < 250) {
        selectMenu.style.left = (selectElement_leftPos - 150) + "px";
    }
    else {
        selectMenu.style.left = (selectElement_leftPos) + "px";
    }
    selectMenu.style.top = (selectElement_topPos + 25) + "px";
    if (displayHeight - selectElement_topPos < 350) {
        selectMenu.style.top = (selectElement_topPos - 300) + "px";
    }
    else {
        selectMenu.style.bottom = (selectElement_topPos) + "px";
    }
    // Set the select menu position
    // Unhide the select menu
    let selectOverlayParent = selectMenu.parentElement;
    if (selectOverlayParent != null) {
        selectOverlayParent.style.display = "block";
    }
    // Clear the select menu
    selectMenu.innerHTML = "";
    // Get the select menu options
    let selectOptions = selectElement.options;
    let currentClan = "";
    // Loop through the select options
    for (let i = 0; i < selectOptions.length; i++) {
        let selected = false;
        if (selectElement.value == selectOptions[i].value) {
            selected = true;
        }
        selectMenu.appendChild(CreateCustomSelectMenuOption(selectElement, selectOptions[i].value, selected));
    }
    // Set the select menu scroll position to the top
    selectMenu.scrollTop = 0;
}
function CreateCustomSelectMenuOption(originalSelectElement, playerIGNAndClan, selected) {
    // Create a div element
    let divElement = document.createElement("div");
    divElement.classList.add("overlay_selectItem");
    divElement.id = playerIGNAndClan;
    let sessionSlot = originalSelectElement.id.split("-")[1];
    // Get all select elements
    let selectElements = document.getElementsByClassName("tableSelect");
    if (selectElements.length == 0) {
        console.log("No select elements found");
        return divElement;
    }
    let selectedValuesFromTheSameSession = [];
    // Loop through the select elements
    for (let i = 0; i < selectElements.length; i++) {
        let selectElement = selectElements[i];
        // Get the select element id
        let selectElementID = selectElements[i].id;
        // If select element is not from the same session slot
        if (selectElementID.split("-")[1] != sessionSlot) {
            continue;
        }
        // Get the select element value and add it to the selectedValuesFromTheSameSession array
        selectedValuesFromTheSameSession.push(selectElement.value);
    }
    // If playerIGNAndClan is found in the selectedValuesFromTheSameSession array
    if (ItemAppearsInArray(playerIGNAndClan, selectedValuesFromTheSameSession) == true) {
        divElement.classList.add("selected_elsewhere");
    }
    if (selected == true) {
        divElement.classList.remove("selected_elsewhere");
        divElement.classList.add("currently_selected");
    }
    // Div on click event
    divElement.onclick = function () {
        // Enable document scroll
        //document.body.style.overflow = 'auto';
        // Set originalSelectElement value to the playerIGNAndClan
        originalSelectElement.value = playerIGNAndClan;
        // Hide the select menu
        let selectOverlay = document.getElementById("CustomSelectWindow");
        if (selectOverlay != null) {
            let selectOverlayParent = selectOverlay.parentElement;
            if (selectOverlayParent != null) {
                selectOverlayParent.style.display = "none";
            }
        }
        OnSelectElementChanged(originalSelectElement);
    };
    // Get player IGN from playerIGNAndClan
    let playerIGN = playerIGNAndClan.split("] ")[1];
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
function AddRowToTableAnyData_ForRosteringTable(tableId, rowData, cellClass = "") {
    // Get the table
    let table = document.getElementById(tableId);
    // Get the table body
    let tableBody = table.tBodies[0];
    // Create a new row
    let newRow = document.createElement("tr");
    // For each row data
    for (let i = 0; i < rowData.length; i++) {
        // Create a new cell
        let newCell = document.createElement("td");
        for (let j = 0; j < rowData[i].length; j++) {
            newCell.appendChild(rowData[i][j]);
        }
        // Cell on click event
        newCell.oncontextmenu = function () { OnCellClicked(newCell); };
        if (cellClass != "") {
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
// Function that creates a textbox element
// Takes in the class of the textbox
// Returns the textbox element
function CreateTextboxElement(className) {
    // Create a new textbox
    let textbox = document.createElement("input");
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
    selectElement.onchange = function () {
        OnSelectElementChanged(selectElement);
        //HighlightAllSelectElementsWithPlayer(selectElement.selectedOptions[0].value);
    };
    // Add the on hover function
    selectElement.onmouseover = function () {
        OnSelectElementHovered(selectElement);
    };
    selectElement.onclick = function () {
        //HighlightAllSelectElementsWithPlayer(optionToSelect);
        OpenCustomSelectMenu(selectElement);
    };
    // Prevent select element from expanding
    selectElement.onmousedown = function () {
        return false;
    };
    // Add the unhover function
    selectElement.onmouseout = function () { OnSelectElementUnhovered(); };
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
function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    let arrData = [[]];
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
        if (strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter) {
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
            strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
        }
        else {
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
function TryLoadDataFromLastSession() {
    // Get the data from the local storage
    let inputCBResponses = localStorage.getItem("inputCBResponses");
    if (inputCBResponses != null) {
        inputCBResponses = inputCBResponses;
        let inputCBResponses_textarea = document.getElementById("inputCBResponses-textarea");
        inputCBResponses_textarea.textContent = inputCBResponses;
        OnBtnClick_LoadCBResponses();
    }
    // Get the data from the local storage
    let inputPlayerDetails = localStorage.getItem("inputPlayerDetails");
    if (inputPlayerDetails != null) {
        inputPlayerDetails = inputPlayerDetails;
        let inputPlayerDetails_textArea = document.getElementById("inputPlayerDetails-textarea");
        inputPlayerDetails_textArea.textContent = inputPlayerDetails;
        OnBtnClick_LoadPlayerDetails();
    }
    if (inputCBResponses == null || inputPlayerDetails == null) {
        return;
    }
    OnBtnClick_GeneratePlayersOnboard();
    OnBtnClick_GenerateRosteringTable();
    // Get the data from the local storage
    let selectedPlayers = localStorage.getItem("selectedPlayers");
    if (selectedPlayers != null) {
        let exportImport_textArea = document.getElementById("export-import-rosteringtable-textarea");
        exportImport_textArea.textContent = selectedPlayers;
        OnBtnClick_ImportRosterData();
    }
}
//# sourceMappingURL=script.js.map