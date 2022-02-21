// Raw csv string for the rawCBResponses
var RawCBResponses_CSV = 
`Hingheru88	Available	Available	Available	Available	Available	Available			Available	Available	8
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

// Raw csv string for the rawplayerdetails
var RawPlayerDetail_CSV = 
`IGN	CLAN	TYPE	TEAM	ENTER BATTLE
Bagpfbones78	VKNGS	PLAYER	BLUE	
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


// struct that stores a single RawCBScheduleResponse
class RawCBResponse
{
    constructor(IGN, WedA, WedB, ThuA, ThuB, SatA, SatB, SunMorningA, SunMorningB, SunNightA, SunNightB, MaxNumSlots)
    {
        this.IGN = IGN;
        this.WedA = WedA;
        this.WedB = WedB;
        this.ThuA = ThuA;
        this.ThuB = ThuB;
        this.SatA = SatA;
        this.SatB = SatB;
        this.SunMorningA = SunMorningA;
        this.SunMorningB = SunMorningB;
        this.SunNightA = SunNightA;
        this.SunNightB = SunNightB;
        this.MaxNumSlots = MaxNumSlots;
    }
}

// struct that stores a single PlayerOnBoard
// IGN, MaxNumSlots, Clan, Team, Type, EnterBattle, Remarks, N1A, N1B, N2A, N2B, N3A, N3B, N4A, N4B
class PlayerOnBoard
{
    constructor(IGN, MaxNumSlots, Clan, Team, Type, EnterBattle, Remarks, WedA, WedB, ThuA, ThuB, SatA, SatB, SunMorningA, SunMorningB, SunNightA, SunNightB)
    {
        this.IGN = IGN;
        this.MaxNumSlots = MaxNumSlots;
        this.Clan = Clan;
        this.Team = Team;
        this.Type = Type;
        this.EnterBattle = EnterBattle;
        this.Remarks = Remarks;
        this.WedA = WedA;
        this.WedB = WedB;
        this.ThuA = ThuA;
        this.ThuB = ThuB;
        this.SatA = SatA;
        this.SatB = SatB;
        this.SunMorningA = SunMorningA;
        this.SunMorningB = SunMorningB;
        this.SunNightA = SunNightA;
        this.SunNightB = SunNightB;
    }
}

// struct that stores a single RawPlayerDetail
// string IGN, Clan, Type, Team, EnterBattle
class RawPlayerDetail
{
    constructor(IGN, Clan, Type, Team, EnterBattle)
    {
        this.IGN = IGN;
        this.Clan = Clan;
        this.Type = Type;
        this.Team = Team;
        this.EnterBattle = EnterBattle;
    }
}

// struct that stores rostering data
// BlueWedA, BlueWedB, BlueThuA, BlueThuB, BlueSatA, BlueSatB, BlueSunMorningA, BlueSunMorningB, BlueSunNightA, BlueSunNightB
// RedWedA, RedWedB, RedThuA, RedThuB, RedSatA, RedSatB, RedSunMorningA, RedSunMorningB, RedSunNightA, RedSunNightB
class WeekRosterData
{
    constructor(BlueWedA, BlueWedB, BlueThuA, BlueThuB, BlueSatA, BlueSatB, BlueSunMorningA, BlueSunMorningB, BlueSunNightA, BlueSunNightB, RedWedA, RedWedB, RedThuA, RedThuB, RedSatA, RedSatB, RedSunMorningA, RedSunMorningB, RedSunNightA, RedSunNightB)
    {
        this.BlueWedA = BlueWedA;
        this.BlueWedB = BlueWedB;
        this.BlueThuA = BlueThuA;
        this.BlueThuB = BlueThuB;
        this.BlueSatA = BlueSatA;
        this.BlueSatB = BlueSatB;
        this.BlueSunMorningA = BlueSunMorningA;
        this.BlueSunMorningB = BlueSunMorningB;
        this.BlueSunNightA = BlueSunNightA;
        this.BlueSunNightB = BlueSunNightB;
        this.RedWedA = RedWedA;
        this.RedWedB = RedWedB;
        this.RedThuA = RedThuA;
        this.RedThuB = RedThuB;
        this.RedSatA = RedSatA;
        this.RedSatB = RedSatB;
        this.RedSunMorningA = RedSunMorningA;
        this.RedSunMorningB = RedSunMorningB;
        this.RedSunNightA = RedSunNightA;
        this.RedSunNightB = RedSunNightB;
    }
}

// struct that stores data in a single night
// PlayerSlotData XO, CO, Player1, Player2, Player3, Player4, Player5
class NightRosterData
{
    constructor(CO, XO, Player1, Player2, Player3, Player4, Player5)
    {
        this.CO = CO;
        this.XO = XO;
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.Player3 = Player3;
        this.Player4 = Player4;
        this.Player5 = Player5;
    }
}

// Static class that contains player remarks
// [DOESN'T EXISTS], [NOT PARTICIPATING], [DUPLICATE]
class PlayerRemark
{
    static get DOESN_T_EXISTS() { return " [ DOESN'T EXISTS ] "; }
    static get NOT_PARTICIPATING() { return " [ NOT PARTICIPATING ] "; }
    static get DUPLICATE() { return " [ DUPLICATE ] "; }
}

// Static class that contains clan battle slots
// WedA, WedB, ThuA, ThuB, SatA, SatB, SunMorningA, SunMorningB, SunNightA, SunNightB
class ClanBattleSlots
{
    static get WedA() { return "WedA"; }
    static get WedB() { return "WedB"; }
    static get ThuA() { return "ThuA"; }
    static get ThuB() { return "ThuB"; }
    static get SatA() { return "SatA"; }
    static get SatB() { return "SatB"; }
    static get SunMorningA() { return "SunMorningA"; }
    static get SunMorningB() { return "SunMorningB"; }
    static get SunNightA() { return "SunNightA"; }
    static get SunNightB() { return "SunNightB"; }
}

// Static class that contains the 2 type of teams
// BLUE, RED
class TeamType
{
    static get BLUE() { return "BLUE"; }
    static get RED() { return "RED"; }
}

// Static class that contains the 2 type of players
// PLAYER, CALLER
class PlayerType
{
    static get PLAYER() { return "PLAYER"; }
    static get CALLER() { return "CALLER"; }
}

// struct that contains player ign, currSlotsAssigned, maxNumSlots
class PlayerSlotData
{
    constructor(IGN, currSlotsAssigned, maxNumSlots)
    {
        this.IGN = IGN;
        this.currSlotsAssigned = currSlotsAssigned;
        this.maxNumSlots = maxNumSlots;
    }
}

class EmptyPlayer
{
    static get IGN() { return "None"; }
    static get Clan() { return "X"; }
}

// Array of RawCBScheduleResponses
var RawCBResponses = [];
// Array of PlayerDetails
var RawPlayerDetails = [];
// Array of PlayerOnBoards
var PlayersOnBoard = [];
// PlayersOnBoard working copy
var WC_PlayersOnBoard = [];
// WeekRosterData working copy
var WC_WeekRosterData = "";
// To track how many slots are assigned to each player
var PlayerSlotsAssigned = [];

// Randomize Seed
var RandomizeSeed = 1296106;
// GetPlayersAvailable call counter
var GetPlayersAvailableCallCounter = 0;

var showExtraPlayerInfoInRosteringTable = true;



//******************* UI FUNCTIONS & EVENTS *********************

// On loadRawCBResponses button click
function OnLoadRawCBResponsesBtn_Click()
{
    // Get the csv from the textarea
    var csv = document.getElementById("rawCBResponses-textarea").value;

    // Set the RawCBScheduleResponses array
    SetRawCBResponses(csv);
    // Update the RawCBScheduleResponses table
    UpdateRawCBResponsesTable();
}

// On loadPlayerDetails button click
function OnLoadRawPlayerDetailsBtn_Click()
{// Get the csv from the textarea
    var csv = document.getElementById("rawPlayerDetails-textarea").value;

    // Set the PlayerDetails array
    SetRawPlayerDetails(csv);
    // Update the PlayerDetails array
    UpdateRawPlayerDetailsTable();
}

// On generatePlayersOnBoard button click
function OnGeneratePlayersOnBoardBtn_Click()
{
    GeneratePlayersOnboard();
    GenerateWC_PlayersOnboard();
    UpdatePlayersOnBoardTable();
}

// On updateWeekRosterData button click
function OnGenerateRosteringTableBtn_Click()
{   
    AddPossiblePlayersToWeekRosterData();
    FilterPlayersByAvailabilityInCellsDropdownMenu();
    UpdateRosteringTable();
    GeneratePlayerSlotAssigments();
    RefreshRosteringTableDisplay();

    // Set the generatedWeekRosterData to true
    generatedWeekRosterData = true;
}

function OnTableSelectedOptionChanged()
{
    RefreshRosteringTableDisplay();
}

function OnExportRosteringTableBtn_Click()
{
    SaveRosteringTable();
}

function OnImportRosteringTableBtn_Click()
{
    LoadRosteringTable();
}

function OnToggleExtraPlayerInfoBtn_Click()
{
    showExtraPlayerInfoInRosteringTable = !showExtraPlayerInfoInRosteringTable;
    UpdateExtraPlayerInfoInRosteringTable();
}

// On html body load
function OnLoad()
{
    let text;
    if (confirm("Load Test Data?") == false) 
    {
        return;
    }

    // ************ TESTING PURPOSES ONLY ************
    // TO AUTO GENERATE THE WEEK ROSTER DATA FROM DUMMY DATA
    // DO NOT USE THIS IN PRODUCTION
    // ***********************************************
    document.getElementById("rawCBResponses-textarea").value = RawCBResponses_CSV;
    document.getElementById("rawPlayerDetails-textarea").value = RawPlayerDetail_CSV;

    OnLoadRawCBResponsesBtn_Click();
    OnLoadRawPlayerDetailsBtn_Click();
    OnGeneratePlayersOnBoardBtn_Click();
    OnGenerateRosteringTableBtn_Click();
    //*************************************************
}

//******************************************************





//******************* UPDATE UI FUNCTIONS **************

// Function that takes in table id and toggle it's visiblity
function ToggleTableVisibility1(tableID)
{
    var table = document.getElementById(tableID).parentNode;
    if (table.style.display == "none")
    {
        table.style.display = "block";
    }
    else
    {
        table.style.display = "none";
    }
}

// Function that takes in clas id and toggle it's visiblity
function ToggleClassVisibility(classID)
{
    var classElement = document.getElementsByClassName(classID);
    if (classElement[0].style.display == "none")
    {
        classElement[0].style.display = "block";
    }
    else
    {
        classElement[0].style.display = "none";
    }
}

// Function to add a row to a table
function AddTableRow(tableID, values, newclass = "")
{
    var table = document.getElementById(tableID);

    // Get table body and insert a row
    var tbody = table.getElementsByTagName("tbody")[0];
    var row = tbody.insertRow();

    for (var i = 0; i < values.length; i++)
    {
        var cell = row.insertCell(-1);
        cell.innerHTML = values[i];
    }

    // Add a class to all cells in the row
    if (newclass != "")
    {
        for (var i = 0; i < row.cells.length; i++)
        {
            row.cells[i].className = newclass;
        }
    }
}

// Function to update the PlayerDetails table
function UpdateRawPlayerDetailsTable()
{
    // Clear the table
    ClearTable("playerDetails-table");

    // Update the PlayerDetails table
    for (var i = 0; i < RawPlayerDetails.length; i++)
    {
        var PlayerDetail = RawPlayerDetails[i];
        AddTableRow(
            "playerDetails-table", 
            [
                PlayerDetail.IGN, 
                PlayerDetail.Clan, 
                PlayerDetail.Type,
                PlayerDetail.Team,
                PlayerDetail.EnterBattle
            ]);
    }
}

// Function to update the PlayersOnboard table
function UpdatePlayersOnBoardTable()
{
    // Clear the table
    ClearTable("playersOnBoard-table");

    for (var i = 0; i < PlayersOnBoard.length; i++)
    {
        var cellClass = ""
        var redCellClass = "redColoredTableRow";
        var darkCellClass = "darkColoredTableRow";

        // If the playeronboard remarks contains [NOT PARTICIPATING]
        if (PlayersOnBoard[i].Remarks.includes(PlayerRemark.NOT_PARTICIPATING))
        {
            cellClass = darkCellClass;
        }
        // Else if the playeronboard remarks contains [DUPLICATE] or [DOESN'T EXIST]
        else if (PlayersOnBoard[i].Remarks.includes(PlayerRemark.DUPLICATE) 
            || PlayersOnBoard[i].Remarks.includes(PlayerRemark.DOESN_T_EXISTS))
        {
            cellClass = redCellClass;
        }

        // Update the playersOnBoard table
        AddTableRow(
            "playersOnBoard-table",
            [
                PlayersOnBoard[i].IGN,
                PlayersOnBoard[i].MaxNumSlots,
                PlayersOnBoard[i].Clan,
                PlayersOnBoard[i].Type,
                PlayersOnBoard[i].Team,
                PlayersOnBoard[i].EnterBattle,
                PlayersOnBoard[i].Remarks,
                PlayersOnBoard[i].WedA,
                PlayersOnBoard[i].WedB,
                PlayersOnBoard[i].ThuA,
                PlayersOnBoard[i].ThuB,
                PlayersOnBoard[i].SatA,
                PlayersOnBoard[i].SatB,
                PlayersOnBoard[i].SunMorningA,
                PlayersOnBoard[i].SunMorningB,
                PlayersOnBoard[i].SunNightA,
                PlayersOnBoard[i].SunNightB
            ],
            cellClass);
    }
}

// Function to update the RawCBScheduleResponses table
function UpdateRawCBResponsesTable()
{
    // Clear the table
    ClearTable("rawCBResponses-table");

    // Replace all occurance of "Available" with "X"
    for (var i = 0; i < RawCBResponses.length; i++)
    {
        var RawCBResponse = RawCBResponses[i];
        RawCBResponse.WedA = RawCBResponse.WedA.replace("Available", "X");
        RawCBResponse.WedB = RawCBResponse.WedB.replace("Available", "X");
        RawCBResponse.ThuA = RawCBResponse.ThuA.replace("Available", "X");
        RawCBResponse.ThuB = RawCBResponse.ThuB.replace("Available", "X");
        RawCBResponse.SatA = RawCBResponse.SatA.replace("Available", "X");
        RawCBResponse.SatB = RawCBResponse.SatB.replace("Available", "X");
        RawCBResponse.SunMorningA = RawCBResponse.SunMorningA.replace("Available", "X");
        RawCBResponse.SunMorningB = RawCBResponse.SunMorningB.replace("Available", "X");
        RawCBResponse.SunNightA = RawCBResponse.SunNightA.replace("Available", "X");
        RawCBResponse.SunNightB = RawCBResponse.SunNightB.replace("Available", "X");
    }

    // Update the RawCBScheduleResponses table
    for (var i = 0; i < RawCBResponses.length; i++)
    {
        var RawCBResponse = RawCBResponses[i];
        AddTableRow(
            "rawCBResponses-table", 
            [
                RawCBResponse.IGN,
                RawCBResponse.WedA,
                RawCBResponse.WedB,
                RawCBResponse.ThuA,
                RawCBResponse.ThuB,
                RawCBResponse.SatA,
                RawCBResponse.SatB,
                RawCBResponse.SunMorningA,
                RawCBResponse.SunMorningB,
                RawCBResponse.SunNightA,
                RawCBResponse.SunNightB,
                RawCBResponse.MaxNumSlots
            ]);
    }
}

// Update rostering-table-blue with WC_WeekRosterData (WeekRosterData)
function UpdateRosteringTable()
{
    // Clear the table
    ClearTable("rostering-table-blue");
    ClearTable("rostering-table-red");

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.CO, WC_WeekRosterData.BlueWedA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.CO, WC_WeekRosterData.BlueWedB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.CO, WC_WeekRosterData.BlueThuA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.CO, WC_WeekRosterData.BlueThuB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.CO, WC_WeekRosterData.BlueSatA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.CO, WC_WeekRosterData.BlueSatB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.CO, WC_WeekRosterData.BlueSunMorningA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.CO, WC_WeekRosterData.BlueSunMorningB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.CO, WC_WeekRosterData.BlueSunNightA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.CO, WC_WeekRosterData.BlueSunNightB.CO[0])
    ]);

    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.XO, WC_WeekRosterData.BlueWedA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.XO, WC_WeekRosterData.BlueWedB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.XO, WC_WeekRosterData.BlueThuA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.XO, WC_WeekRosterData.BlueThuB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.XO, WC_WeekRosterData.BlueSatA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.XO, WC_WeekRosterData.BlueSatB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.XO, WC_WeekRosterData.BlueSunMorningA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.XO, WC_WeekRosterData.BlueSunMorningB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.XO, WC_WeekRosterData.BlueSunNightA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.XO, WC_WeekRosterData.BlueSunNightB.XO[0])
    ]);

    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.Player1, WC_WeekRosterData.BlueWedA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.Player1, WC_WeekRosterData.BlueWedB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.Player1, WC_WeekRosterData.BlueThuA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.Player1, WC_WeekRosterData.BlueThuB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.Player1, WC_WeekRosterData.BlueSatA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.Player1, WC_WeekRosterData.BlueSatB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.Player1, WC_WeekRosterData.BlueSunMorningA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.Player1, WC_WeekRosterData.BlueSunMorningB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.Player1, WC_WeekRosterData.BlueSunNightA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.Player1, WC_WeekRosterData.BlueSunNightB.Player1[0])
    ]);

    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.Player2, WC_WeekRosterData.BlueWedA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.Player2, WC_WeekRosterData.BlueWedB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.Player2, WC_WeekRosterData.BlueThuA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.Player2, WC_WeekRosterData.BlueThuB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.Player2, WC_WeekRosterData.BlueSatA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.Player2, WC_WeekRosterData.BlueSatB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.Player2, WC_WeekRosterData.BlueSunMorningA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.Player2, WC_WeekRosterData.BlueSunMorningB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.Player2, WC_WeekRosterData.BlueSunNightA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.Player2, WC_WeekRosterData.BlueSunNightB.Player2[0])
    ]);

    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.Player3, WC_WeekRosterData.BlueWedA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.Player3, WC_WeekRosterData.BlueWedB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.Player3, WC_WeekRosterData.BlueThuA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.Player3, WC_WeekRosterData.BlueThuB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.Player3, WC_WeekRosterData.BlueSatA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.Player3, WC_WeekRosterData.BlueSatB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.Player3, WC_WeekRosterData.BlueSunMorningA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.Player3, WC_WeekRosterData.BlueSunMorningB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.Player3, WC_WeekRosterData.BlueSunNightA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.Player3, WC_WeekRosterData.BlueSunNightB.Player3[0])
    ]);

    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.Player4, WC_WeekRosterData.BlueWedA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.Player4, WC_WeekRosterData.BlueWedB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.Player4, WC_WeekRosterData.BlueThuA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.Player4, WC_WeekRosterData.BlueThuB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.Player4, WC_WeekRosterData.BlueSatA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.Player4, WC_WeekRosterData.BlueSatB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.Player4, WC_WeekRosterData.BlueSunMorningA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.Player4, WC_WeekRosterData.BlueSunMorningB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.Player4, WC_WeekRosterData.BlueSunNightA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.Player4, WC_WeekRosterData.BlueSunNightB.Player4[0])
    ]);

    AddTableRow("rostering-table-blue", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedA.Player5, WC_WeekRosterData.BlueWedA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueWedB.Player5, WC_WeekRosterData.BlueWedB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuA.Player5, WC_WeekRosterData.BlueThuA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueThuB.Player5, WC_WeekRosterData.BlueThuB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatA.Player5, WC_WeekRosterData.BlueSatA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSatB.Player5, WC_WeekRosterData.BlueSatB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningA.Player5, WC_WeekRosterData.BlueSunMorningA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunMorningB.Player5, WC_WeekRosterData.BlueSunMorningB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightA.Player5, WC_WeekRosterData.BlueSunNightA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.BlueSunNightB.Player5, WC_WeekRosterData.BlueSunNightB.Player5[0])
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.CO, WC_WeekRosterData.RedWedA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.CO, WC_WeekRosterData.RedWedB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.CO, WC_WeekRosterData.RedThuA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.CO, WC_WeekRosterData.RedThuB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.CO, WC_WeekRosterData.RedSatA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.CO, WC_WeekRosterData.RedSatB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.CO, WC_WeekRosterData.RedSunMorningA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.CO, WC_WeekRosterData.RedSunMorningB.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.CO, WC_WeekRosterData.RedSunNightA.CO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.CO, WC_WeekRosterData.RedSunNightB.CO[0])
    ]);

    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.XO, WC_WeekRosterData.RedWedA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.XO, WC_WeekRosterData.RedWedB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.XO, WC_WeekRosterData.RedThuA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.XO, WC_WeekRosterData.RedThuB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.XO, WC_WeekRosterData.RedSatA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.XO, WC_WeekRosterData.RedSatB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.XO, WC_WeekRosterData.RedSunMorningA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.XO, WC_WeekRosterData.RedSunMorningB.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.XO, WC_WeekRosterData.RedSunNightA.XO[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.XO, WC_WeekRosterData.RedSunNightB.XO[0])
    ]);

    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.Player1, WC_WeekRosterData.RedWedA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.Player1, WC_WeekRosterData.RedWedB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.Player1, WC_WeekRosterData.RedThuA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.Player1, WC_WeekRosterData.RedThuB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.Player1, WC_WeekRosterData.RedSatA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.Player1, WC_WeekRosterData.RedSatB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.Player1, WC_WeekRosterData.RedSunMorningA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.Player1, WC_WeekRosterData.RedSunMorningB.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.Player1, WC_WeekRosterData.RedSunNightA.Player1[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.Player1, WC_WeekRosterData.RedSunNightB.Player1[0])
    ]);

    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.Player2, WC_WeekRosterData.RedWedA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.Player2, WC_WeekRosterData.RedWedB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.Player2, WC_WeekRosterData.RedThuA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.Player2, WC_WeekRosterData.RedThuB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.Player2, WC_WeekRosterData.RedSatA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.Player2, WC_WeekRosterData.RedSatB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.Player2, WC_WeekRosterData.RedSunMorningA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.Player2, WC_WeekRosterData.RedSunMorningB.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.Player2, WC_WeekRosterData.RedSunNightA.Player2[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.Player2, WC_WeekRosterData.RedSunNightB.Player2[0])
    ]);

    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.Player3, WC_WeekRosterData.RedWedA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.Player3, WC_WeekRosterData.RedWedB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.Player3, WC_WeekRosterData.RedThuA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.Player3, WC_WeekRosterData.RedThuB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.Player3, WC_WeekRosterData.RedSatA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.Player3, WC_WeekRosterData.RedSatB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.Player3, WC_WeekRosterData.RedSunMorningA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.Player3, WC_WeekRosterData.RedSunMorningB.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.Player3, WC_WeekRosterData.RedSunNightA.Player3[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.Player3, WC_WeekRosterData.RedSunNightB.Player3[0])
    ]);

    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.Player4, WC_WeekRosterData.RedWedA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.Player4, WC_WeekRosterData.RedWedB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.Player4, WC_WeekRosterData.RedThuA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.Player4, WC_WeekRosterData.RedThuB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.Player4, WC_WeekRosterData.RedSatA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.Player4, WC_WeekRosterData.RedSatB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.Player4, WC_WeekRosterData.RedSunMorningA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.Player4, WC_WeekRosterData.RedSunMorningB.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.Player4, WC_WeekRosterData.RedSunNightA.Player4[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.Player4, WC_WeekRosterData.RedSunNightB.Player4[0])
    ]);

    AddTableRow("rostering-table-red", [
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedA.Player5, WC_WeekRosterData.RedWedA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedWedB.Player5, WC_WeekRosterData.RedWedB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuA.Player5, WC_WeekRosterData.RedThuA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedThuB.Player5, WC_WeekRosterData.RedThuB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatA.Player5, WC_WeekRosterData.RedSatA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSatB.Player5, WC_WeekRosterData.RedSatB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningA.Player5, WC_WeekRosterData.RedSunMorningA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunMorningB.Player5, WC_WeekRosterData.RedSunMorningB.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightA.Player5, WC_WeekRosterData.RedSunNightA.Player5[0]),
        GenerateSelectElementForRosteringTable(WC_WeekRosterData.RedSunNightB.Player5, WC_WeekRosterData.RedSunNightB.Player5[0])
    ]);

    // Get the all cells from the first 2 rows table body of the rostering-table-red and rostering-table-blue tables
    var cells = [];
    cells.push(document.getElementById("rostering-table-red").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td"));
    cells.push(document.getElementById("rostering-table-red").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td"));
    cells.push(document.getElementById("rostering-table-blue").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td"));
    cells.push(document.getElementById("rostering-table-blue").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td"));

    // for each cells, add a class to the cell
    for (var i = 0; i < cells.length; i++)
    {
        for (var j = 0; j < cells[i].length; j++)
        {
            cells[i][j].className = "callerCell";
        }
    }
}

// Function that returns a formatted string of a html select element
// Takes in a list of string
// Takes in the string
// html class "tableSelect"
function GenerateSelectElementForRosteringTable(players, selected)
{
    var select = "<select class='tableSelect' onchange='OnTableSelectedOptionChanged()'>";
    
    // Add a empty player option
    var emptyPlayerIGNWithClanTag = "[" + EmptyPlayer.Clan + "] " + EmptyPlayer.IGN;
    select += "<option value='" +  emptyPlayerIGNWithClanTag + "'" + ">" + emptyPlayerIGNWithClanTag + "</option>";

    for (var i = 0; i < players.length; i++)
    {
        var playerIGNWithClanTag = "[" + players[i].Clan + "] " + players[i].IGN;
        select += "<option value='" +  playerIGNWithClanTag + "'" + (playerIGNWithClanTag == selected ? " selected" : "") + ">" + playerIGNWithClanTag + "</option>";
    }
    select += "</select>";
    return select;
}

//******************************************************







// Function to return a list of players IGN that are available for the given slot
// Use the WC_PlayersOnboard array to determine which players are available
// Takes in the slot (e.g. "N1A")
// Returns an array of players
function GetPlayersAvailableInCBSlot(slot)
{
    GetPlayersAvailableCallCounter++;

    // Initialize the playersAvailable array
    var playersAvailable = [];

    // Loop through the playersOnboard array
    for (var i = 0; i < WC_PlayersOnBoard.length; i++)
    {
        var available = false;

        switch (slot)
        {
            case ClanBattleSlots.WedA:
                if (WC_PlayersOnBoard[i].WedA == "X") available = true;
                break;
            case ClanBattleSlots.WedB:
                if (WC_PlayersOnBoard[i].WedB == "X") available = true;
                break;
            case ClanBattleSlots.ThuA:
                if (WC_PlayersOnBoard[i].ThuA == "X") available = true;
                break;
            case ClanBattleSlots.ThuB:
                if (WC_PlayersOnBoard[i].ThuB == "X") available = true;
                break;
            case ClanBattleSlots.SatA:
                if (WC_PlayersOnBoard[i].SatA == "X") available = true;
                break;
            case ClanBattleSlots.SatB:
                if (WC_PlayersOnBoard[i].SatB == "X") available = true;
                break;
            case ClanBattleSlots.SunMorningA:
                if (WC_PlayersOnBoard[i].SunMorningA == "X") available = true;
                break;
            case ClanBattleSlots.SunMorningB:
                if (WC_PlayersOnBoard[i].SunMorningB == "X") available = true;
                break;
            case ClanBattleSlots.SunNightA:
                if (WC_PlayersOnBoard[i].SunNightA == "X") available = true;
                break;
            case ClanBattleSlots.SunNightB:
                if (WC_PlayersOnBoard[i].SunNightB == "X") available = true;
                break;
        }

        // If the player is available, add the player IGN to the playersAvailable array
        if(available)
        {
            // Add the player IGN to the playersAvailable array
            playersAvailable.push(WC_PlayersOnBoard[i]);
        }
    }

    // randomize the playersAvailable array with randomizeArray()
    playersAvailable = ReorderArray(playersAvailable, RandomizeSeed + GetPlayersAvailableCallCounter);

    // Return the playersAvailable array
    return playersAvailable;
}

// Replace the RawCBScheduleResponses array with the a string of csv
// Update the RawCBScheduleResponses table
function SetRawCBResponses(csv)
{
    RawCBResponses = [];
    var lines = csv.split("\n");
    for (var i = 0; i < lines.length; i++)
    {
        var line = lines[i];
        var values = line.split("\t");
        var ign = values[0];
        var wedA = values[1];
        var wedB = values[2];
        var thuA = values[3];
        var thuB = values[4];
        var satA = values[5];
        var satB = values[6];
        var sunMorningA = values[7];
        var sunMorningB = values[8];
        var sunNightA = values[9];
        var sunNightB = values[10];
        var maxNumSlots = values[11];
        RawCBResponses.push(new RawCBResponse(ign, wedA, wedB, thuA, thuB, satA, satB, sunMorningA, sunMorningB, sunNightA, sunNightB, maxNumSlots));
    }
}

// Replace the PlayerDetails array with the a string of csv
function SetRawPlayerDetails(csv)
{
    RawPlayerDetails = [];
    var lines = csv.split("\n");
    for (var i = 1; i < lines.length; i++)
    {
        var line = lines[i];
        var values = line.split("\t");
        var ign = values[0];
        var clan = values[1];
        var type = values[2];
        var team = values[3];
        var enterBattle = values[4];
        RawPlayerDetails.push(new RawPlayerDetail(ign, clan, type, team , enterBattle));
    }
}

function GeneratePlayersOnboard()
{
    // Clear PlayersOnBoard array
    PlayersOnBoard = [];

    // Get a list of player IGNs from the rawcbresponses array
    var playerIGNs = [];
    for (var i = 0; i < RawCBResponses.length; i++)
    {
        var RawCBResponse = RawCBResponses[i];
        playerIGNs.push(RawCBResponse.IGN);
    }

    // Get a list of duplicates from the playerIGNs array
    var playerIGNDuplicates = [];
    for (var i = 0; i < playerIGNs.length; i++)
    {
        var playerIGN = playerIGNs[i];
        if (playerIGNs.indexOf(playerIGN) != i)
        {
            playerIGNDuplicates.push(playerIGN);
        }
    }

    // Foreach playerIGN in the playerIGN array
    for (var i = 0; i < playerIGNs.length; i++)
    {
        var maxNumSlots = 0;
        var clan = "";
        var team = "";
        var type = "";
        var enterBattle = "";
        var remarks = "";

        var wedA = "";
        var wedB = "";
        var thuA = "";
        var thuB = "";
        var satA = "";
        var satB = "";
        var sunMorningA = "";
        var sunMorningB = "";
        var sunNightA = "";
        var sunNightB = "";

        // Get the player's clan and type from the rawplayerdetails array
        for (var j = 0; j < RawPlayerDetails.length; j++)
        {
            var RawPlayerDetail = RawPlayerDetails[j];
            if (RawPlayerDetail.IGN.toLowerCase() == playerIGNs[i].toLowerCase())
            {
                clan = RawPlayerDetail.Clan;
                team = RawPlayerDetail.Team;
                type = RawPlayerDetail.Type;
                enterBattle = RawPlayerDetail.EnterBattle;
            }
        }
        // Get the player's maxNumSlots from the rawcbresponses array
        for (var j = 0; j < RawCBResponses.length; j++)
        {
            var RawCBResponse = RawCBResponses[j];
            if (RawCBResponse.IGN == playerIGNs[i])
            {
                maxNumSlots = RawCBResponse.MaxNumSlots;

                wedA = RawCBResponse.WedA;
                wedB = RawCBResponse.WedB;
                thuA = RawCBResponse.ThuA;
                thuB = RawCBResponse.ThuB;
                satA = RawCBResponse.SatA;
                satB = RawCBResponse.SatB;
                sunMorningA = RawCBResponse.SunMorningA;
                sunMorningB = RawCBResponse.SunMorningB;
                sunNightA = RawCBResponse.SunNightA;
                sunNightB = RawCBResponse.SunNightB;
            }
        }

        // if clan and type are empty
        if (clan == "" && type == "")
        {
            remarks += PlayerRemark.DOESN_T_EXISTS;
        }

        // if maxnumslots is 0
        if (maxNumSlots == 0)
        {
            remarks += PlayerRemark.NOT_PARTICIPATING;
        }

        // if playerIGN is in the playerIGNDuplicates array
        if (playerIGNDuplicates.indexOf(playerIGNs[i]) != -1)
        {
            remarks += PlayerRemark.DUPLICATE;
        }

        // Add the player to the playersOnBoard array
        PlayersOnBoard.push(new PlayerOnBoard(playerIGNs[i], maxNumSlots, clan, team, type, enterBattle, remarks, wedA, wedB, thuA, thuB, satA, satB, sunMorningA, sunMorningB, sunNightA, sunNightB));
    }
}

function GenerateWC_PlayersOnboard()
{
    // Clear the WC_PlayersOnBoard array
    WC_PlayersOnBoard = [];

    // Foreach playersOnBoard in the playersOnBoard array
    for (var i = 0; i < PlayersOnBoard.length; i++)
    {
        // Push the player to the wcPlayersOnBoard array
        WC_PlayersOnBoard.push(PlayersOnBoard[i]);
    }

    // Get a list of IGN of players who are not participating or does not exist
    var notParticipatingOrDoesntExistPlayers = [];
    for (var i = 0; i < WC_PlayersOnBoard.length; i++)
    {
        var player = WC_PlayersOnBoard[i];
        if (player.Remarks.indexOf(PlayerRemark.NOT_PARTICIPATING) != -1 || player.Remarks.indexOf(PlayerRemark.DOESN_T_EXISTS) != -1)
        {
            notParticipatingOrDoesntExistPlayers.push(player.IGN);
        }
    }

    // Remove the players who are not participating, is duplicate or does not exist from the wcPlayersOnBoard array
    for (var i = 0; i < WC_PlayersOnBoard.length; i++)
    {
        var player = WC_PlayersOnBoard[i];
        if (notParticipatingOrDoesntExistPlayers.indexOf(player.IGN) != -1 || player.Remarks.indexOf(PlayerRemark.DUPLICATE) != -1)
        {
            WC_PlayersOnBoard.splice(i, 1);
            i--;
        }
    }


    // Array of players that are duplicates
    var playerIGNDuplicates = [];

    // For each player that contains the duplicate string in the remarks
    // Add the duplicate player to the playerIGNDuplicates array if it is not already in the array
    for (var i = 0; i < WC_PlayersOnBoard.length; i++)
    {
        var player = WC_PlayersOnBoard[i];

        // If player remarks contains the duplicate string
        if (player.Remarks.includes(PlayerRemark.DUPLICATE))
        {
            // If the player is not already in the playerIGNDuplicates array
            if (playerIGNDuplicates.indexOf(player.IGN) == -1)
            {
                // Push the player to the playerIGNDuplicates array
                playerIGNDuplicates.push(player.IGN);
            }
        }
    }

    // for each player in playerignduplicates array
    for (var i = 0; i < playerIGNDuplicates.length; i++)
    {
        // Get the indexes of the players in the wcPlayersOnBoard array that have the same IGN
        var indexes = [];
        for (var j = 0; j < WC_PlayersOnBoard.length; j++)
        {
            var player = WC_PlayersOnBoard[j];
            if (player.IGN == playerIGNDuplicates[i])
            {
                indexes.push(j);
            }
        }

        // Using the indexes, remove the players from the wcPlayersOnBoard array except the last one
        for (var j = 0; j < indexes.length - 1; j++)
        {
            WC_PlayersOnBoard.splice(indexes[j], 1);
        }
    }
}

// Add possible players into WC_WeekRosterData
function AddPossiblePlayersToWeekRosterData() 
{
    // Initlaize the players in the week roster data array (blue)
    var Night_Blue_WedA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.WedA, TeamType.BLUE);
    var Night_Blue_WedA_CO = Night_Blue_WedA_Players[0];
    var Night_Blue_WedA_XO = Night_Blue_WedA_Players[1];
    var Night_Blue_WedA_P1 = Night_Blue_WedA_Players[2];
    var Night_Blue_WedA_P2 = Night_Blue_WedA_Players[3];
    var Night_Blue_WedA_P3 = Night_Blue_WedA_Players[4];
    var Night_Blue_WedA_P4 = Night_Blue_WedA_Players[5];
    var Night_Blue_WedA_P5 = Night_Blue_WedA_Players[6];

    var Night_Blue_WedB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.WedB, TeamType.BLUE);
    var Night_Blue_WedB_CO = Night_Blue_WedB_Players[0];
    var Night_Blue_WedB_XO = Night_Blue_WedB_Players[1];
    var Night_Blue_WedB_P1 = Night_Blue_WedB_Players[2];
    var Night_Blue_WedB_P2 = Night_Blue_WedB_Players[3];
    var Night_Blue_WedB_P3 = Night_Blue_WedB_Players[4];
    var Night_Blue_WedB_P4 = Night_Blue_WedB_Players[5];
    var Night_Blue_WedB_P5 = Night_Blue_WedB_Players[6];
    
    var Night_Blue_ThuA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.ThuA, TeamType.BLUE);
    var Night_Blue_ThuA_CO = Night_Blue_ThuA_Players[0];
    var Night_Blue_ThuA_XO = Night_Blue_ThuA_Players[1];
    var Night_Blue_ThuA_P1 = Night_Blue_ThuA_Players[2];
    var Night_Blue_ThuA_P2 = Night_Blue_ThuA_Players[3];
    var Night_Blue_ThuA_P3 = Night_Blue_ThuA_Players[4];
    var Night_Blue_ThuA_P4 = Night_Blue_ThuA_Players[5];
    var Night_Blue_ThuA_P5 = Night_Blue_ThuA_Players[6];

    var Night_Blue_ThuB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.ThuB, TeamType.BLUE);
    var Night_Blue_ThuB_CO = Night_Blue_ThuB_Players[0];
    var Night_Blue_ThuB_XO = Night_Blue_ThuB_Players[1];
    var Night_Blue_ThuB_P1 = Night_Blue_ThuB_Players[2];
    var Night_Blue_ThuB_P2 = Night_Blue_ThuB_Players[3];
    var Night_Blue_ThuB_P3 = Night_Blue_ThuB_Players[4];
    var Night_Blue_ThuB_P4 = Night_Blue_ThuB_Players[5];
    var Night_Blue_ThuB_P5 = Night_Blue_ThuB_Players[6];
    
    var Night_Blue_SatA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SatA, TeamType.BLUE);
    var Night_Blue_SatA_CO = Night_Blue_SatA_Players[0];
    var Night_Blue_SatA_XO = Night_Blue_SatA_Players[1];
    var Night_Blue_SatA_P1 = Night_Blue_SatA_Players[2];
    var Night_Blue_SatA_P2 = Night_Blue_SatA_Players[3];
    var Night_Blue_SatA_P3 = Night_Blue_SatA_Players[4];
    var Night_Blue_SatA_P4 = Night_Blue_SatA_Players[5];
    var Night_Blue_SatA_P5 = Night_Blue_SatA_Players[6];

    var Night_Blue_SatB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SatB, TeamType.BLUE);
    var Night_Blue_SatB_CO = Night_Blue_SatB_Players[0];
    var Night_Blue_SatB_XO = Night_Blue_SatB_Players[1];
    var Night_Blue_SatB_P1 = Night_Blue_SatB_Players[2];
    var Night_Blue_SatB_P2 = Night_Blue_SatB_Players[3];
    var Night_Blue_SatB_P3 = Night_Blue_SatB_Players[4];
    var Night_Blue_SatB_P4 = Night_Blue_SatB_Players[5];
    var Night_Blue_SatB_P5 = Night_Blue_SatB_Players[6];

    var Night_Blue_SunMorningA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunMorningA, TeamType.BLUE);
    var Night_Blue_SunMorningA_CO = Night_Blue_SunMorningA_Players[0];
    var Night_Blue_SunMorningA_XO = Night_Blue_SunMorningA_Players[1];
    var Night_Blue_SunMorningA_P1 = Night_Blue_SunMorningA_Players[2];
    var Night_Blue_SunMorningA_P2 = Night_Blue_SunMorningA_Players[3];
    var Night_Blue_SunMorningA_P3 = Night_Blue_SunMorningA_Players[4];
    var Night_Blue_SunMorningA_P4 = Night_Blue_SunMorningA_Players[5];
    var Night_Blue_SunMorningA_P5 = Night_Blue_SunMorningA_Players[6];

    var Night_Blue_SunMorningB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunMorningB, TeamType.BLUE);
    var Night_Blue_SunMorningB_CO = Night_Blue_SunMorningB_Players[0];
    var Night_Blue_SunMorningB_XO = Night_Blue_SunMorningB_Players[1];
    var Night_Blue_SunMorningB_P1 = Night_Blue_SunMorningB_Players[2];
    var Night_Blue_SunMorningB_P2 = Night_Blue_SunMorningB_Players[3];
    var Night_Blue_SunMorningB_P3 = Night_Blue_SunMorningB_Players[4];
    var Night_Blue_SunMorningB_P4 = Night_Blue_SunMorningB_Players[5];
    var Night_Blue_SunMorningB_P5 = Night_Blue_SunMorningB_Players[6];

    var Night_Blue_SunNightA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunNightA, TeamType.BLUE);
    var Night_Blue_SunNightA_CO = Night_Blue_SunNightA_Players[0];
    var Night_Blue_SunNightA_XO = Night_Blue_SunNightA_Players[1];
    var Night_Blue_SunNightA_P1 = Night_Blue_SunNightA_Players[2];
    var Night_Blue_SunNightA_P2 = Night_Blue_SunNightA_Players[3];
    var Night_Blue_SunNightA_P3 = Night_Blue_SunNightA_Players[4];
    var Night_Blue_SunNightA_P4 = Night_Blue_SunNightA_Players[5];
    var Night_Blue_SunNightA_P5 = Night_Blue_SunNightA_Players[6];

    var Night_Blue_SunNightB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunNightB, TeamType.BLUE);
    var Night_Blue_SunNightB_CO = Night_Blue_SunNightB_Players[0];
    var Night_Blue_SunNightB_XO = Night_Blue_SunNightB_Players[1];
    var Night_Blue_SunNightB_P1 = Night_Blue_SunNightB_Players[2];
    var Night_Blue_SunNightB_P2 = Night_Blue_SunNightB_Players[3];
    var Night_Blue_SunNightB_P3 = Night_Blue_SunNightB_Players[4];
    var Night_Blue_SunNightB_P4 = Night_Blue_SunNightB_Players[5];
    var Night_Blue_SunNightB_P5 = Night_Blue_SunNightB_Players[6];

    // Initialize 8 NightRosterData (Blue)
    var WC_NightRosterData_Blue_WedA = new NightRosterData(Night_Blue_WedA_CO, Night_Blue_WedA_XO, Night_Blue_WedA_P1, Night_Blue_WedA_P2, Night_Blue_WedA_P3, Night_Blue_WedA_P4, Night_Blue_WedA_P5);
    var WC_NightRosterData_Blue_WedB = new NightRosterData(Night_Blue_WedB_CO, Night_Blue_WedB_XO, Night_Blue_WedB_P1, Night_Blue_WedB_P2, Night_Blue_WedB_P3, Night_Blue_WedB_P4, Night_Blue_WedB_P5);
    var WC_NightRosterData_Blue_ThuA = new NightRosterData(Night_Blue_ThuA_CO, Night_Blue_ThuA_XO, Night_Blue_ThuA_P1, Night_Blue_ThuA_P2, Night_Blue_ThuA_P3, Night_Blue_ThuA_P4, Night_Blue_ThuA_P5);
    var WC_NightRosterData_Blue_ThuB = new NightRosterData(Night_Blue_ThuB_CO, Night_Blue_ThuB_XO, Night_Blue_ThuB_P1, Night_Blue_ThuB_P2, Night_Blue_ThuB_P3, Night_Blue_ThuB_P4, Night_Blue_ThuB_P5);
    var WC_NightRosterData_Blue_SatA = new NightRosterData(Night_Blue_SatA_CO, Night_Blue_SatA_XO, Night_Blue_SatA_P1, Night_Blue_SatA_P2, Night_Blue_SatA_P3, Night_Blue_SatA_P4, Night_Blue_SatA_P5);
    var WC_NightRosterData_Blue_SatB = new NightRosterData(Night_Blue_SatB_CO, Night_Blue_SatB_XO, Night_Blue_SatB_P1, Night_Blue_SatB_P2, Night_Blue_SatB_P3, Night_Blue_SatB_P4, Night_Blue_SatB_P5);
    var WC_NightRosterData_Blue_SunMorningA = new NightRosterData(Night_Blue_SunMorningA_CO, Night_Blue_SunMorningA_XO, Night_Blue_SunMorningA_P1, Night_Blue_SunMorningA_P2, Night_Blue_SunMorningA_P3, Night_Blue_SunMorningA_P4, Night_Blue_SunMorningA_P5);
    var WC_NightRosterData_Blue_SunMorningB = new NightRosterData(Night_Blue_SunMorningB_CO, Night_Blue_SunMorningB_XO, Night_Blue_SunMorningB_P1, Night_Blue_SunMorningB_P2, Night_Blue_SunMorningB_P3, Night_Blue_SunMorningB_P4, Night_Blue_SunMorningB_P5);
    var WC_NightRosterData_Blue_SunNightA = new NightRosterData(Night_Blue_SunNightA_CO, Night_Blue_SunNightA_XO, Night_Blue_SunNightA_P1, Night_Blue_SunNightA_P2, Night_Blue_SunNightA_P3, Night_Blue_SunNightA_P4, Night_Blue_SunNightA_P5);
    var WC_NightRosterData_Blue_SunNightB = new NightRosterData(Night_Blue_SunNightB_CO, Night_Blue_SunNightB_XO, Night_Blue_SunNightB_P1, Night_Blue_SunNightB_P2, Night_Blue_SunNightB_P3, Night_Blue_SunNightB_P4, Night_Blue_SunNightB_P5);

    // Initlaize the players in the week roster data array (red)
    var Night_Red_WedA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.WedA, TeamType.RED);
    var Night_Red_WedA_CO = Night_Red_WedA_Players[0];
    var Night_Red_WedA_XO = Night_Red_WedA_Players[1];
    var Night_Red_WedA_P1 = Night_Red_WedA_Players[2];
    var Night_Red_WedA_P2 = Night_Red_WedA_Players[3];
    var Night_Red_WedA_P3 = Night_Red_WedA_Players[4];
    var Night_Red_WedA_P4 = Night_Red_WedA_Players[5];
    var Night_Red_WedA_P5 = Night_Red_WedA_Players[6];

    var Night_Red_WedB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.WedB, TeamType.RED);
    var Night_Red_WedB_CO = Night_Red_WedB_Players[0];
    var Night_Red_WedB_XO = Night_Red_WedB_Players[1];
    var Night_Red_WedB_P1 = Night_Red_WedB_Players[2];
    var Night_Red_WedB_P2 = Night_Red_WedB_Players[3];
    var Night_Red_WedB_P3 = Night_Red_WedB_Players[4];
    var Night_Red_WedB_P4 = Night_Red_WedB_Players[5];
    var Night_Red_WedB_P5 = Night_Red_WedB_Players[6];

    var Night_Red_ThuA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.ThuA, TeamType.RED);
    var Night_Red_ThuA_CO = Night_Red_ThuA_Players[0];
    var Night_Red_ThuA_XO = Night_Red_ThuA_Players[1];
    var Night_Red_ThuA_P1 = Night_Red_ThuA_Players[2];
    var Night_Red_ThuA_P2 = Night_Red_ThuA_Players[3];
    var Night_Red_ThuA_P3 = Night_Red_ThuA_Players[4];
    var Night_Red_ThuA_P4 = Night_Red_ThuA_Players[5];
    var Night_Red_ThuA_P5 = Night_Red_ThuA_Players[6];

    var Night_Red_ThuB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.ThuB, TeamType.RED);
    var Night_Red_ThuB_CO = Night_Red_ThuB_Players[0];
    var Night_Red_ThuB_XO = Night_Red_ThuB_Players[1];
    var Night_Red_ThuB_P1 = Night_Red_ThuB_Players[2];
    var Night_Red_ThuB_P2 = Night_Red_ThuB_Players[3];
    var Night_Red_ThuB_P3 = Night_Red_ThuB_Players[4];
    var Night_Red_ThuB_P4 = Night_Red_ThuB_Players[5];
    var Night_Red_ThuB_P5 = Night_Red_ThuB_Players[6];

    var Night_Red_SatA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SatA, TeamType.RED);
    var Night_Red_SatA_CO = Night_Red_SatA_Players[0];
    var Night_Red_SatA_XO = Night_Red_SatA_Players[1];
    var Night_Red_SatA_P1 = Night_Red_SatA_Players[2];
    var Night_Red_SatA_P2 = Night_Red_SatA_Players[3];
    var Night_Red_SatA_P3 = Night_Red_SatA_Players[4];
    var Night_Red_SatA_P4 = Night_Red_SatA_Players[5];
    var Night_Red_SatA_P5 = Night_Red_SatA_Players[6];

    var Night_Red_SatB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SatB, TeamType.RED);
    var Night_Red_SatB_CO = Night_Red_SatB_Players[0];
    var Night_Red_SatB_XO = Night_Red_SatB_Players[1];
    var Night_Red_SatB_P1 = Night_Red_SatB_Players[2];
    var Night_Red_SatB_P2 = Night_Red_SatB_Players[3];
    var Night_Red_SatB_P3 = Night_Red_SatB_Players[4];
    var Night_Red_SatB_P4 = Night_Red_SatB_Players[5];
    var Night_Red_SatB_P5 = Night_Red_SatB_Players[6];

    var Night_Red_SunMorningA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunMorningA, TeamType.RED);
    var Night_Red_SunMorningA_CO = Night_Red_SunMorningA_Players[0];
    var Night_Red_SunMorningA_XO = Night_Red_SunMorningA_Players[1];
    var Night_Red_SunMorningA_P1 = Night_Red_SunMorningA_Players[2];
    var Night_Red_SunMorningA_P2 = Night_Red_SunMorningA_Players[3];
    var Night_Red_SunMorningA_P3 = Night_Red_SunMorningA_Players[4];
    var Night_Red_SunMorningA_P4 = Night_Red_SunMorningA_Players[5];
    var Night_Red_SunMorningA_P5 = Night_Red_SunMorningA_Players[6];

    var Night_Red_SunMorningB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunMorningB, TeamType.RED);
    var Night_Red_SunMorningB_CO = Night_Red_SunMorningB_Players[0];
    var Night_Red_SunMorningB_XO = Night_Red_SunMorningB_Players[1];
    var Night_Red_SunMorningB_P1 = Night_Red_SunMorningB_Players[2];
    var Night_Red_SunMorningB_P2 = Night_Red_SunMorningB_Players[3];
    var Night_Red_SunMorningB_P3 = Night_Red_SunMorningB_Players[4];
    var Night_Red_SunMorningB_P4 = Night_Red_SunMorningB_Players[5];
    var Night_Red_SunMorningB_P5 = Night_Red_SunMorningB_Players[6];

    var Night_Red_SunNightA_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunNightA, TeamType.RED);
    var Night_Red_SunNightA_CO = Night_Red_SunNightA_Players[0];
    var Night_Red_SunNightA_XO = Night_Red_SunNightA_Players[1];
    var Night_Red_SunNightA_P1 = Night_Red_SunNightA_Players[2];
    var Night_Red_SunNightA_P2 = Night_Red_SunNightA_Players[3];
    var Night_Red_SunNightA_P3 = Night_Red_SunNightA_Players[4];
    var Night_Red_SunNightA_P4 = Night_Red_SunNightA_Players[5];
    var Night_Red_SunNightA_P5 = Night_Red_SunNightA_Players[6];

    var Night_Red_SunNightB_Players = FilterPlayersByAvailabilityInCellsDropdownMenu(ClanBattleSlots.SunNightB, TeamType.RED);
    var Night_Red_SunNightB_CO = Night_Red_SunNightB_Players[0];
    var Night_Red_SunNightB_XO = Night_Red_SunNightB_Players[1];
    var Night_Red_SunNightB_P1 = Night_Red_SunNightB_Players[2];
    var Night_Red_SunNightB_P2 = Night_Red_SunNightB_Players[3];
    var Night_Red_SunNightB_P3 = Night_Red_SunNightB_Players[4];
    var Night_Red_SunNightB_P4 = Night_Red_SunNightB_Players[5];
    var Night_Red_SunNightB_P5 = Night_Red_SunNightB_Players[6];

    // Initialize 8 NightRosterData (Red)
    var WC_NightRosterData_Red_WedA = new NightRosterData(Night_Red_WedA_CO, Night_Red_WedA_XO, Night_Red_WedA_P1, Night_Red_WedA_P2, Night_Red_WedA_P3, Night_Red_WedA_P4, Night_Red_WedA_P5);
    var WC_NightRosterData_Red_WedB = new NightRosterData(Night_Red_WedB_CO, Night_Red_WedB_XO, Night_Red_WedB_P1, Night_Red_WedB_P2, Night_Red_WedB_P3, Night_Red_WedB_P4, Night_Red_WedB_P5);
    var WC_NightRosterData_Red_ThuA = new NightRosterData(Night_Red_ThuA_CO, Night_Red_ThuA_XO, Night_Red_ThuA_P1, Night_Red_ThuA_P2, Night_Red_ThuA_P3, Night_Red_ThuA_P4, Night_Red_ThuA_P5);
    var WC_NightRosterData_Red_ThuB = new NightRosterData(Night_Red_ThuB_CO, Night_Red_ThuB_XO, Night_Red_ThuB_P1, Night_Red_ThuB_P2, Night_Red_ThuB_P3, Night_Red_ThuB_P4, Night_Red_ThuB_P5);
    var WC_NightRosterData_Red_SatA = new NightRosterData(Night_Red_SatA_CO, Night_Red_SatA_XO, Night_Red_SatA_P1, Night_Red_SatA_P2, Night_Red_SatA_P3, Night_Red_SatA_P4, Night_Red_SatA_P5);
    var WC_NightRosterData_Red_SatB = new NightRosterData(Night_Red_SatB_CO, Night_Red_SatB_XO, Night_Red_SatB_P1, Night_Red_SatB_P2, Night_Red_SatB_P3, Night_Red_SatB_P4, Night_Red_SatB_P5);
    var WC_NightRosterData_Red_SunMorningA = new NightRosterData(Night_Red_SunMorningA_CO, Night_Red_SunMorningA_XO, Night_Red_SunMorningA_P1, Night_Red_SunMorningA_P2, Night_Red_SunMorningA_P3, Night_Red_SunMorningA_P4, Night_Red_SunMorningA_P5);
    var WC_NightRosterData_Red_SunMorningB = new NightRosterData(Night_Red_SunMorningB_CO, Night_Red_SunMorningB_XO, Night_Red_SunMorningB_P1, Night_Red_SunMorningB_P2, Night_Red_SunMorningB_P3, Night_Red_SunMorningB_P4, Night_Red_SunMorningB_P5);
    var WC_NightRosterData_Red_SunNightA = new NightRosterData(Night_Red_SunNightA_CO, Night_Red_SunNightA_XO, Night_Red_SunNightA_P1, Night_Red_SunNightA_P2, Night_Red_SunNightA_P3, Night_Red_SunNightA_P4, Night_Red_SunNightA_P5);
    var WC_NightRosterData_Red_SunNightB = new NightRosterData(Night_Red_SunNightB_CO, Night_Red_SunNightB_XO, Night_Red_SunNightB_P1, Night_Red_SunNightB_P2, Night_Red_SunNightB_P3, Night_Red_SunNightB_P4, Night_Red_SunNightB_P5);

    // Initialize the WeekRosterData
    WC_WeekRosterData = new WeekRosterData(
        WC_NightRosterData_Blue_WedA, 
        WC_NightRosterData_Blue_WedB, 
        WC_NightRosterData_Blue_ThuA, 
        WC_NightRosterData_Blue_ThuB, 
        WC_NightRosterData_Blue_SatA, 
        WC_NightRosterData_Blue_SatB, 
        WC_NightRosterData_Blue_SunMorningA, 
        WC_NightRosterData_Blue_SunMorningB, 
        WC_NightRosterData_Blue_SunNightA, 
        WC_NightRosterData_Blue_SunNightB, 
        WC_NightRosterData_Red_WedA, 
        WC_NightRosterData_Red_WedB, 
        WC_NightRosterData_Red_ThuA, 
        WC_NightRosterData_Red_ThuB, 
        WC_NightRosterData_Red_SatA, 
        WC_NightRosterData_Red_SatB, 
        WC_NightRosterData_Red_SunMorningA, 
        WC_NightRosterData_Red_SunMorningB, 
        WC_NightRosterData_Red_SunNightA, 
        WC_NightRosterData_Red_SunNightB);
}

// Function to randomize an array order and return it
// Parametmer to a seed string to randomize the array in a repeatable way
function ReorderArray(array, seed)
{
    return array;

    // A little error handling, whynot!
    if(!seed)
        throw new Error("deterministicShuffle: seed not given, or 0");

    var temp,j;

    for(var i=0; i<array.length; i++){
        // Select a "random" position.
        j = (seed % (i+1) + i) % array.length;

        // Swap the current element with the "random" one.
        temp=array[i];
        array[i]=array[j];
        array[j]=temp;

    }

    return array;
}
  
function random(seed) 
{
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
}


// playersInWatch contains 7 slots
// Each slots contains an array of players
// Each player in the array is a candidate for the session
// players are filtered out based on criteria

// teamType: "Blue" or "Red" - the team for the session
function FilterPlayersByAvailabilityInCellsDropdownMenu(cbSlot, teamType)
{
    var filter_RedPlayerCantPlayOnBlue = false;
    var filter_coMustBeCaller = true;
    var filter_xoMustBeCaller = true;

    // Copy playersAvailableInSlot array to temp arrays
    var coSlot = GetPlayersAvailableInCBSlot(cbSlot);
    var xoSlot = GetPlayersAvailableInCBSlot(cbSlot);
    var p1Slot = GetPlayersAvailableInCBSlot(cbSlot);
    var p2Slot = GetPlayersAvailableInCBSlot(cbSlot);
    var p3Slot = GetPlayersAvailableInCBSlot(cbSlot);
    var p4Slot = GetPlayersAvailableInCBSlot(cbSlot);
    var p5Slot = GetPlayersAvailableInCBSlot(cbSlot);






    // ************************** FILTER ************************************
    // Remove players if from red team if teamType is "Blue"
    // **********************************************************************
    if(filter_RedPlayerCantPlayOnBlue)
    {
        // coSlot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = coSlot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && coSlot[i].Team == TeamType.RED)
            {
                coSlot.splice(i, 1);
            }
        }

        // xoSlot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = xoSlot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && xoSlot[i].Team == TeamType.RED)
            {
                xoSlot.splice(i, 1);
            }
        }

        // p1Slot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = p1Slot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && p1Slot[i].Team == TeamType.RED)
            {
                p1Slot.splice(i, 1);
            }
        }

        // p2Slot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = p2Slot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && p2Slot[i].Team == TeamType.RED)
            {
                p2Slot.splice(i, 1);
            }
        }

        // p3Slot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = p3Slot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && p3Slot[i].Team == TeamType.RED)
            {
                p3Slot.splice(i, 1);
            }
        }

        // p4Slot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = p4Slot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && p4Slot[i].Team == TeamType.RED)
            {
                p4Slot.splice(i, 1);
            }
        }

        // p5Slot
        // For each slot, filter out players if teamType is blue and they are from the red team
        // Loop from last to first to avoid messing up the array
        for (var i = p5Slot.length - 1; i >= 0; i--)
        {
            if (teamType == TeamType.BLUE && p5Slot[i].Team == TeamType.RED)
            {
                p5Slot.splice(i, 1);
            }
        }
    }
    // **********************************************************************



    // ************************** FILTER ************************************
    // Remove players from co slot if they are not the caller
    // **********************************************************************
    if(filter_coMustBeCaller)
    {
        // coSlot
        // For each slot, filter out players that type is not caller
        // Loop from last to first to avoid messing up the array
        for (var i = coSlot.length - 1; i >= 0; i--)
        {
            if(coSlot[i].Type != PlayerType.CALLER)
            {
                coSlot.splice(i, 1);
            }
        }
    }
    // **********************************************************************

    
    // ************************** FILTER ************************************
    // Remove players from xo slot if they are not the caller
    // **********************************************************************
    if(filter_xoMustBeCaller)
    {
        // xoSlot
        // For each slot, filter out players that type is not caller
        // Loop from last to first to avoid messing up the array
        for (var i = xoSlot.length - 1; i >= 0; i--)
        {
            if(xoSlot[i].Type != PlayerType.CALLER)
            {
                xoSlot.splice(i, 1);
            }
        }
    }
    // **********************************************************************

    



    var playersAvailableInSlot = [];

    // Add the filtered players to the playersAvailableInSlot array
    playersAvailableInSlot.push(coSlot);
    playersAvailableInSlot.push(xoSlot);
    playersAvailableInSlot.push(p1Slot);
    playersAvailableInSlot.push(p2Slot);
    playersAvailableInSlot.push(p3Slot);
    playersAvailableInSlot.push(p4Slot);
    playersAvailableInSlot.push(p5Slot);

    return playersAvailableInSlot;
}

// Populate playerSlotData with the players participating 
function GeneratePlayerSlotAssigments()
{
    // Clear the playerSlotData array
    PlayerSlotsAssigned = [];

    // Foreach player in the WC_PlayersOnBoard array
    for (var i = 0; i < WC_PlayersOnBoard.length; i++)
    {
        // Create new playerSlotData object
        var playerSlotData = new Object();

        // Set the playerSlotData properties
        playerSlotData.IGN = WC_PlayersOnBoard[i].IGN;
        playerSlotData.currSlotsAssigned = 0;
        playerSlotData.maxNumSlots = WC_PlayersOnBoard[i].MaxNumSlots;

        // Add the playerSlotData object to the playerSlotData array
        PlayerSlotsAssigned.push(playerSlotData);
     }
}

// Function to update currSlotsAssigned for each player
// Determine the slots assigned by each player by referemcing the table
function UpdatePlayerSlotsAssigned()
{
    // Get the table for blue team
    var tableBlue = document.getElementById("rostering-table-blue");

    // Get the table for red team
    var tableRed = document.getElementById("rostering-table-red");

    // Get the items in the table for blue team
    var tableBlueItems = tableBlue.getElementsByTagName("td");
    // Get the items in the table for red team
    var tableRedItems = tableRed.getElementsByTagName("td");

    // convert tableBlueItems to array
    tableBlueItems = Array.prototype.slice.call(tableBlueItems);
    // convert tableRedItems to array
    tableRedItems = Array.prototype.slice.call(tableRedItems);

    // Combine the blue and red team items using the concat method
    var tableItems = tableBlueItems.concat(tableRedItems);

    // Loop through the PlayerSlotsAssigned array
    for (var j = 0; j < PlayerSlotsAssigned.length; j++)
    {
        // Reset the currSlotsAssigned to 0
        PlayerSlotsAssigned[j].currSlotsAssigned = 0;
    }

    // Loop through the table items
    for (var i = 0; i < tableItems.length; i++)
    {
        // Extract the selected value from select element
        var selectedValue = tableItems[i].getElementsByTagName("select")[0].value;

        // If the selected value is empty
        if (selectedValue == "")
        {
            // Continue to the next iteration
            continue;
        }

        // Use regex and remove the clan tag from the selected value
        // Clan tag is contained in [] brackets and it is in the beginning of the selected value
        var clanTag = selectedValue.match(/\[.*?\] /);

        // Remove the clan tag from the selected value
        selectedValue = selectedValue.replace(clanTag, "");

        // Loop through the playerSlotData array
        for (var j = 0; j < PlayerSlotsAssigned.length; j++)
        {
            // If the selected value matches the IGN of the player in the playerSlotData array
            if (selectedValue == PlayerSlotsAssigned[j].IGN)
            {
                // Increment the currSlotsAssigned property
                PlayerSlotsAssigned[j].currSlotsAssigned++;
            }
        }
    }
}

function UpdatePlayerSlotAssignedLabels()
{
    // Redraw the playersSlotsAssigned section with updated data
    
    // Clear the container
    document.getElementsByClassName("playersSlotsAssignedSection")[0].innerHTML = "";

    // Div template for the playerSlotData
    var playerSlotDataTemplate = '<div class="playerSlotContainer">IGN <div id="IDNAME">CURRSLOTSASSIGNED / MAXSLOTS</div></div>';

    // Loop through the playerSlotData array
    for (var i = 0; i < PlayerSlotsAssigned.length; i++)
    {
        var idName = "";

        // Determine if player currSlotsAssigned is
        // less than or equals to maxNumSlots
        // more than maxNumSlots
        if (PlayerSlotsAssigned[i].currSlotsAssigned <= PlayerSlotsAssigned[i].maxNumSlots)
        {
            // Set the class name to green
            var idName = "normal";
        }
        else
        {
            // Set the class name to red
            var idName = "overfilled";
        }

        // Create a temporary copy of playerSlotDataTemplate
        var tempPlayerSlotDataTemplate = playerSlotDataTemplate;

        // Replace the IDNAME with the idName
        tempPlayerSlotDataTemplate = tempPlayerSlotDataTemplate.replace("IDNAME", idName);
        // Replace the IGN with the IGN
        tempPlayerSlotDataTemplate = tempPlayerSlotDataTemplate.replace("IGN", PlayerSlotsAssigned[i].IGN);
        // Replace the CURRSLOTSASSIGNED with the currSlotsAssigned
        tempPlayerSlotDataTemplate = tempPlayerSlotDataTemplate.replace("CURRSLOTSASSIGNED", PlayerSlotsAssigned[i].currSlotsAssigned);
        // Replace the MAXSLOTS with the maxNumSlots
        tempPlayerSlotDataTemplate = tempPlayerSlotDataTemplate.replace("MAXSLOTS", PlayerSlotsAssigned[i].maxNumSlots);

        // Append the tempPlayerSlotDataTemplate to the container
        document.getElementsByClassName("playersSlotsAssignedSection")[0].innerHTML += tempPlayerSlotDataTemplate;
    }
}

// Function that updates the table ClanBase_ColumnLabel with the clan tag
function UpdateClanBaseColumnLabel()
{
    // Get blue team table
    var tableBlue = document.getElementById("rostering-table-blue");
    // Get table body
    var tableBlueBody = tableBlue.getElementsByTagName("tbody")[0];

    // Get values from first column of blue team table
    var tableBlueRows = tableBlueBody.getElementsByTagName("tr");

    // contains column data
    // each column contains player clan tag with IGN
    var tableBlueColumnsValue = [];
    // initialize tableBlueColumns with 10 empty arrays
    for (var i = 0; i < 10; i++)
    {
        tableBlueColumnsValue.push([]);
    }

    // Loop through the table blue rows
    for (var i = 0; i < tableBlueRows.length; i++)
    {
        // tableBlueRows values contain a select element
        // Get the select elements
        var tableBlueRow_1_Select = tableBlueRows[i].getElementsByTagName("select")[0];
        var tableBlueRow_2_Select = tableBlueRows[i].getElementsByTagName("select")[1];
        var tableBlueRow_3_Select = tableBlueRows[i].getElementsByTagName("select")[2];
        var tableBlueRow_4_Select = tableBlueRows[i].getElementsByTagName("select")[3];
        var tableBlueRow_5_Select = tableBlueRows[i].getElementsByTagName("select")[4];
        var tableBlueRow_6_Select = tableBlueRows[i].getElementsByTagName("select")[5];
        var tableBlueRow_7_Select = tableBlueRows[i].getElementsByTagName("select")[6];
        var tableBlueRow_8_Select = tableBlueRows[i].getElementsByTagName("select")[7];

        // push the select elements to the tableBlueColumns array
        tableBlueColumnsValue[0].push(tableBlueRow_1_Select.value);
        tableBlueColumnsValue[1].push(tableBlueRow_2_Select.value);
        tableBlueColumnsValue[2].push(tableBlueRow_3_Select.value);
        tableBlueColumnsValue[3].push(tableBlueRow_4_Select.value);
        tableBlueColumnsValue[4].push(tableBlueRow_5_Select.value);
        tableBlueColumnsValue[5].push(tableBlueRow_6_Select.value);
        tableBlueColumnsValue[6].push(tableBlueRow_7_Select.value);
        tableBlueColumnsValue[7].push(tableBlueRow_8_Select.value);
    }

    // Get all ClanBase_ColumnLabel elements from blue team table
    var clanBaseColumnLabel_blue = tableBlue.getElementsByClassName("ClanBase_ColumnLabel");

    // Loop through the tableBlueColumnsValue array
    for (var i = 0; i < tableBlueColumnsValue.length; i++)
    {
        // Array to store the clan tags
        var clanTags = [];

        // Loop through the tableBlueColumnsValue array
        for (var j = 0; j < tableBlueColumnsValue[i].length; j++)
        {
            // Extract clan tag from the tableBlueColumnsValue array into a string
            // Clan tag is contained in [] brackets and it is in the beginning of the selected value
            var clanTag = tableBlueColumnsValue[i][j].match(/\[.*?\] /);

            // If there are no clan tags
            if (clanTag == null)
            {
                clanTags.push("");
            }
            else
            {
                clanTags.push(clanTag[0]);
            }
        }

        // Find the clan tag that is the most common
        // Store the most common clan tag in mostCommonClanTag
        // Remove square brackets from mostCommonClanTag
        var mostCommonClanTag = MostFrequentInArray(clanTags).replace(/\[|\]/g, '');
        var numTimesMostCommonClanTag = clanTags.filter(function(value) { return value == mostCommonClanTag; }).length;

        // Set the most common clan tag to the clanBaseColumnLabel
        clanBaseColumnLabel_blue[i].innerHTML = "No Clan Base";

        // Set the clanBaseColumnLabel id
        clanBaseColumnLabel_blue[i].id = "noBase";

        // Check if mostCommonClanTag appears 4 or more times in clanTags 
        // and is not equals to EmptyPlayer.Clan
        if (numTimesMostCommonClanTag >= 4 && mostCommonClanTag !== EmptyPlayer.Clan)
        {
            // Set the most common clan tag to the clanBaseColumnLabel
            clanBaseColumnLabel_blue[i].innerHTML = mostCommonClanTag;

            // Clear the clanBaseColumnLabel id
            clanBaseColumnLabel_blue[i].id = ""; 
        }
    }










    // Get red team table
    var tableRed = document.getElementById("rostering-table-red");
    // Get table body
    var tableRedBody = tableRed.getElementsByTagName("tbody")[0];

    // Get values from first column of red team table
    var tableRedRows = tableRedBody.getElementsByTagName("tr");

    // contains column data
    // each column contains player clan tag with IGN
    var tableRedColumnsValue = [];
    // initialize tableRedColumns with 8 empty arrays
    for (var i = 0; i < 8; i++)
    {
        tableRedColumnsValue.push([]);
    }

    // Loop through the table red rows
    for (var i = 0; i < tableRedRows.length; i++)
    {
        // tableRedRows values contain a select element
        // Get the select elements
        var tableRedRow_1_Select = tableRedRows[i].getElementsByTagName("select")[0];
        var tableRedRow_2_Select = tableRedRows[i].getElementsByTagName("select")[1];
        var tableRedRow_3_Select = tableRedRows[i].getElementsByTagName("select")[2];
        var tableRedRow_4_Select = tableRedRows[i].getElementsByTagName("select")[3];
        var tableRedRow_5_Select = tableRedRows[i].getElementsByTagName("select")[4];
        var tableRedRow_6_Select = tableRedRows[i].getElementsByTagName("select")[5];
        var tableRedRow_7_Select = tableRedRows[i].getElementsByTagName("select")[6];
        var tableRedRow_8_Select = tableRedRows[i].getElementsByTagName("select")[7];

        // push the select elements to the tableRedColumns array
        tableRedColumnsValue[0].push(tableRedRow_1_Select.value);
        tableRedColumnsValue[1].push(tableRedRow_2_Select.value);
        tableRedColumnsValue[2].push(tableRedRow_3_Select.value);
        tableRedColumnsValue[3].push(tableRedRow_4_Select.value);
        tableRedColumnsValue[4].push(tableRedRow_5_Select.value);
        tableRedColumnsValue[5].push(tableRedRow_6_Select.value);
        tableRedColumnsValue[6].push(tableRedRow_7_Select.value);
        tableRedColumnsValue[7].push(tableRedRow_8_Select.value);
    }

    // Get all ClanBase_ColumnLabel elements from red team table
    var clanBaseColumnLabel_red = tableRed.getElementsByClassName("ClanBase_ColumnLabel");

    // Loop through the tableRedColumnsValue array
    for (var i = 0; i < tableRedColumnsValue.length; i++)
    {
        // Array to store the clan tags
        var clanTags = [];

        // Loop through the tableRedColumnsValue array
        for (var j = 0; j < tableRedColumnsValue[i].length; j++)
        {
            // Extract clan tag from the tableRedColumnsValue array into a string
            // Clan tag is contained in [] brackets and it is in the beginning of the selected value
            var clanTag = tableRedColumnsValue[i][j].match(/\[.*?\] /);

            // If there are no clan tags
            if (clanTag == null)
            {
                clanTags.push("");
            }
            else
            {
                clanTags.push(clanTag[0]);
            }
        }

        // Find the clan tag that is the most common
        // Store the most common clan tag in mostCommonClanTag
        var mostCommonClanTag = MostFrequentInArray(clanTags);

        // Check if mostCommonClanTag appears 4 or more times in clanTags
        if (clanTags.filter(function(value) { return value == mostCommonClanTag; }).length >= 4)
        {
            // Remove square brackets from mostCommonClanTag
            mostCommonClanTag = mostCommonClanTag.replace(/\[|\]/g, '');

            // Set the most common clan tag to the clanBaseColumnLabel
            clanBaseColumnLabel_red[i].innerHTML = mostCommonClanTag;

            // Clear the clanBaseColumnLabel id
            clanBaseColumnLabel_red[i].id = ""; 
        }
        else
        {
            // Set the most common clan tag to the clanBaseColumnLabel
            clanBaseColumnLabel_red[i].innerHTML = "No Clan Base";

            // Set the clanBaseColumnLabel id
            clanBaseColumnLabel_red[i].id = "noBase";
        }
    }
}

// Takes in an array and return the most common element
function MostFrequentInArray(arr)
{
        
    // Sort the array
    arr.sort();
        
    // find the max frequency using linear
    // traversal
    let max_count = 1, res = arr[0];
    let curr_count = 1;
        
    for (let i = 1; i < arr.length; i++)
    {
        if (arr[i] == arr[i - 1])
            curr_count++;
        else
        {
            if (curr_count > max_count)
            {
                max_count = curr_count;
                res = arr[i - 1];
            }
            curr_count = 1;
        }
    }
    
    // If last element is most frequent
    if (curr_count > max_count)
    {
        max_count = curr_count;
        res = arr[arr.length - 1];
    }
    return res;
}

function RefreshRosteringTableDisplay()
{
    UpdatePlayerSlotsAssigned();
    UpdatePlayerSlotAssignedLabels();
    UpdatePlayerDuplicateCellAppearence();
    UpdateClanBaseColumnLabel();
    UpdateExtraPlayerInfoInRosteringTable();
}

function UpdatePlayerDuplicateCellAppearence()
{
    // Get select element values from blue and red team tables
    var tableBlue = document.getElementById("rostering-table-blue");
    var tableBlueBody = tableBlue.getElementsByTagName("tbody")[0];
    var tableRed = document.getElementById("rostering-table-red");
    var tableRedBody = tableRed.getElementsByTagName("tbody")[0];
    
    tableBlueColumns = [];
    tableBlueColumns_1 = [];
    tableBlueColumns_2 = [];
    tableBlueColumns_3 = [];
    tableBlueColumns_4 = [];
    tableBlueColumns_5 = [];
    tableBlueColumns_6 = [];
    tableBlueColumns_7 = [];
    tableBlueColumns_8 = [];
    tableBlueColumns_9 = [];
    tableBlueColumns_10 = [];
    
    tableRedColumns = [];
    tableRedColumns_1 = [];
    tableRedColumns_2 = [];
    tableRedColumns_3 = [];
    tableRedColumns_4 = [];
    tableRedColumns_5 = [];
    tableRedColumns_6 = [];
    tableRedColumns_7 = [];
    tableRedColumns_8 = [];
    tableRedColumns_9 = [];
    tableRedColumns_10 = [];

    // Loop through the table blue rows
    for (var i = 0; i < tableBlueBody.rows.length; i++)
    {
        tableBlueColumns_1.push(tableBlueBody.rows[i].getElementsByTagName("select")[0]);
        tableBlueColumns_2.push(tableBlueBody.rows[i].getElementsByTagName("select")[1]);
        tableBlueColumns_3.push(tableBlueBody.rows[i].getElementsByTagName("select")[2]);
        tableBlueColumns_4.push(tableBlueBody.rows[i].getElementsByTagName("select")[3]);
        tableBlueColumns_5.push(tableBlueBody.rows[i].getElementsByTagName("select")[4]);
        tableBlueColumns_6.push(tableBlueBody.rows[i].getElementsByTagName("select")[5]);
        tableBlueColumns_7.push(tableBlueBody.rows[i].getElementsByTagName("select")[6]);
        tableBlueColumns_8.push(tableBlueBody.rows[i].getElementsByTagName("select")[7]);
        tableBlueColumns_9.push(tableBlueBody.rows[i].getElementsByTagName("select")[8]);
        tableBlueColumns_10.push(tableBlueBody.rows[i].getElementsByTagName("select")[9]);
    }

    // Loop through the table red rows
    for (var i = 0; i < tableRedBody.rows.length; i++)
    {
        tableRedColumns_1.push(tableRedBody.rows[i].getElementsByTagName("select")[0]);
        tableRedColumns_2.push(tableRedBody.rows[i].getElementsByTagName("select")[1]);
        tableRedColumns_3.push(tableRedBody.rows[i].getElementsByTagName("select")[2]);
        tableRedColumns_4.push(tableRedBody.rows[i].getElementsByTagName("select")[3]);
        tableRedColumns_5.push(tableRedBody.rows[i].getElementsByTagName("select")[4]);
        tableRedColumns_6.push(tableRedBody.rows[i].getElementsByTagName("select")[5]);
        tableRedColumns_7.push(tableRedBody.rows[i].getElementsByTagName("select")[6]);
        tableRedColumns_8.push(tableRedBody.rows[i].getElementsByTagName("select")[7]);
        tableRedColumns_9.push(tableRedBody.rows[i].getElementsByTagName("select")[8]);
        tableRedColumns_10.push(tableRedBody.rows[i].getElementsByTagName("select")[9]);
    }

    tableBlueColumns.push(tableBlueColumns_1, tableBlueColumns_2, tableBlueColumns_3, tableBlueColumns_4, tableBlueColumns_5, tableBlueColumns_6, tableBlueColumns_7, tableBlueColumns_8, tableBlueColumns_9, tableBlueColumns_10);
    tableRedColumns.push(tableRedColumns_1, tableRedColumns_2, tableRedColumns_3, tableRedColumns_4, tableRedColumns_5, tableRedColumns_6, tableRedColumns_7, tableRedColumns_8, tableRedColumns_9, tableRedColumns_10);

    // Loop through the table blue and red columns
    for (var i = 0; i < 10; i++)
    {
        // Array of playerNames
        var playerNames = [];

        // Loop through the table blue columns
        for (var j = 0; j < tableBlueColumns[i].length; j++)
        {
            // Get the playerName from the select element
            var playerName = tableBlueColumns[i][j].value;

            // If the playerName is not empty
            if (playerName != "")
            {
                // Push the playerName to the playerNames array
                playerNames.push(playerName);
            }
        }

        // Loop through the table red columns
        for (var j = 0; j < tableRedColumns[i].length; j++)
        {
            // Get the playerName from the select element
            var playerName = tableRedColumns[i][j].value;

            // If the playerName is not empty
            if (playerName != "")
            {
                // Push the playerName to the playerNames array
                playerNames.push(playerName);
            }
        }

        // Get the items in the playerNames array that appear more than once
        var duplicatePlayers = playerNames.filter(function(item, pos) {
            return playerNames.indexOf(item) != pos;
        });

        // loop through the table blue columns
        for (var j = 0; j < tableBlueColumns[i].length; j++)
        {
            // Get the playerName from the select element
            var playerName = tableBlueColumns[i][j].value;

            // Get the parent element of the select element
            var parentElement = tableBlueColumns[i][j].parentElement;

            // If the playerName is in the duplicatePlayers array
            if (duplicatePlayers.indexOf(playerName) != -1)
            {
                // Add class duplicate-player to the parent element
                parentElement.classList.add("duplicate-player");
            }
            else
            {
                // Remove class duplicate-player from the parent element
                parentElement.classList.remove("duplicate-player");
            }
        }

        // loop through the table red columns
        for (var j = 0; j < tableRedColumns[i].length; j++)
        {
            // Get the playerName from the select element
            var playerName = tableRedColumns[i][j].value;

            // Get the parent element of the select element
            var parentElement = tableRedColumns[i][j].parentElement;

            // If the playerName is in the duplicatePlayers array
            // and playerName doesn't contain EmptyPlayer.IGN (which is the default value)
            if (duplicatePlayers.indexOf(playerName) != -1)
            {
                // Add class duplicate-player to the parent element
                parentElement.classList.add("duplicate-player");
            }
        }
    }
}

function UpdateExtraPlayerInfoInRosteringTable()
{
    // Get blue and red team tables
    var tableBlue = document.getElementById("rostering-table-blue");
    var tableRed = document.getElementById("rostering-table-red");

    // Get all cells in blue team and red team table body
    var tableBlueCells = tableBlue.getElementsByTagName("tbody")[0].getElementsByTagName("td");
    var tableRedCells = tableRed.getElementsByTagName("tbody")[0].getElementsByTagName("td");

    var allTableCells = [];

    // Push all cells into an array
    for (var i = 0; i < tableBlueCells.length; i++)
    {
        allTableCells.push(tableBlueCells[i]);
    }
    for (var i = 0; i < tableRedCells.length; i++)
    {
        allTableCells.push(tableRedCells[i]);
    }

    // Loop through allTableCells array
    for (var i = 0; i < allTableCells.length; i++)
    {
        var tableCell = allTableCells[i];

        // In table cell, remove elements that contain class "extra-info"
        var extraInfoElements = tableCell.getElementsByClassName("extra-info");
        while (extraInfoElements.length > 0)
        {
            extraInfoElements[0].parentNode.removeChild(extraInfoElements[0]);
        }
    }

    if(showExtraPlayerInfoInRosteringTable == false)
    {
        return;
    }

    // Loop through allTableCells array
    for (var i = 0; i < allTableCells.length; i++)
    {
        var tableCell = allTableCells[i];
        
        // Get the player name from the select element
        var playerName = allTableCells[i].getElementsByTagName("select")[0].value;
        // Regex remove clan tag from player name
        playerName = playerName.replace(/\[.*?\] /, "");

        if(playerName == EmptyPlayer.IGN)
        {
            continue;
        }

        // Use WC_PlayersOnBoard array to find matching player IGN
        var player = WC_PlayersOnBoard.find(function(element) { return element.IGN == playerName; });

        var extraInfoCaller_HTMLTemplate = '<div class="extra-info extra-info-caller">CALLER</div>';
        var extraInfoEnterBtl_HTMLTemplate = '<div class="extra-info extra-info-startbtl">KEY</div>';
        var extraInfoStartBlueTeam_HTMLTemplate = '<div class="extra-info extra-info-bluteam">BLUE</div>';
        var extraInfoStartRedTeam_HTMLTemplate = '<div class="extra-info extra-info-redteam">RED</div>';

        // Check if player is a caller
        if(player.Type == PlayerType.CALLER)
        {
            tableCell.prepend(CreateElementFromHTML(extraInfoCaller_HTMLTemplate));
        }

        // Check if player can enter battle
        if(player.EnterBattle == "YES")
        {
            tableCell.prepend(CreateElementFromHTML(extraInfoEnterBtl_HTMLTemplate));
        }

        // Check if player in blue team
        if(player.Team === TeamType.BLUE)
        {
            tableCell.prepend(CreateElementFromHTML(extraInfoStartBlueTeam_HTMLTemplate));
        }

        // Check if player in red team
        if(player.Team === TeamType.RED)
        {
            tableCell.prepend(CreateElementFromHTML(extraInfoStartRedTeam_HTMLTemplate));
        }
    }
}

// Function to clear a table body
// Takes in an ID from the table
function ClearTable(tableID)
{
    // Get table body
    var tableBody = document.getElementById(tableID).getElementsByTagName("tbody")[0];

    tableBody.innerHTML = "";
}

// Function to create a html DOM element from a string
function CreateElementFromHTML(htmlString) 
{
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

// Function that saves the rostering-table-blue and rostering-table-red select elements to a json string
function SaveRosteringTable()
{
    // Get all table cells from blue and red team tables
    var tableBlueCells = document.getElementById("rostering-table-blue").getElementsByTagName("tbody")[0].getElementsByTagName("td");
    var tableRedCells = document.getElementById("rostering-table-red").getElementsByTagName("tbody")[0].getElementsByTagName("td");

    // Create an array to store all table cells
    var allTableCells = [];

    // Push all cells into an array
    for (var i = 0; i < tableBlueCells.length; i++)
    {
        allTableCells.push(tableBlueCells[i]);
    }
    for (var i = 0; i < tableRedCells.length; i++)
    {
        allTableCells.push(tableRedCells[i]);
    }

    // Create an array to store all player IGNs
    var allPlayerIGNs = [];

    // Loop through allTableCells array
    for (var i = 0; i < allTableCells.length; i++)
    {
        var tableCell = allTableCells[i];

        // Get all player IGNs from the options in the select element
        var playerIGNs = tableCell.getElementsByTagName("select")[0].getElementsByTagName("option");

        var playerIGNsToAdd = [];

        // Store all player IGNs in an array
        for (var j = 0; j < playerIGNs.length; j++)
        {
            playerIGNsToAdd.push(playerIGNs[j].value);
        }

        // Add all player IGNs to allPlayerIGNs array
        allPlayerIGNs.push(playerIGNsToAdd);
    }

    // Create a json string from allPlayerIGNs array
    var jsonString = JSON.stringify(allPlayerIGNs);

    // Set the json string to the export-import-rosteringtable-textarea textarea
    document.getElementById("export-import-rosteringtable-textarea").value = jsonString;
}

// Function that loads the rostering-table-blue and rostering-table-red select elements from a json string
function LoadRosteringTable()
{
    // Get json string from textarea
    var jsonString = document.getElementById("export-import-rosteringtable-textarea").value;

    // Check if json string is empty
    if(jsonString == "")
    {
        alert("No data in clipboard");
        return;
    }

    // Parse json string to an array
    var allPlayerIGNs = JSON.parse(jsonString);

    // Get all table cells from blue and red team tables
    var tableBlueCells = document.getElementById("rostering-table-blue").getElementsByTagName("tbody")[0].getElementsByTagName("td");
    var tableRedCells = document.getElementById("rostering-table-red").getElementsByTagName("tbody")[0].getElementsByTagName("td");

    // Loop through blue and red team table cells
    for (var i = 0; i < tableBlueCells.length; i++)
    {
        var tableCell = tableBlueCells[i];

        // Clear the select element
        tableCell.getElementsByTagName("select")[0].innerHTML = "";

        // Loop through allPlayerIGNs array
        for (var j = 0; j < allPlayerIGNs[i].length; j++)
        {
            // Create an option element
            var option = document.createElement("option");

            // Set the option text
            option.text = allPlayerIGNs[i][j];

            // Add the option to the select element
            tableCell.getElementsByTagName("select")[0].add(option);
        }
    }

    for (var i = 0; i < tableRedCells.length; i++)
    {
        var tableCell = tableRedCells[i];

        // Clear the select element
        tableCell.getElementsByTagName("select")[0].innerHTML = "";

        // Loop through allPlayerIGNs array
        for (var j = 0; j < allPlayerIGNs[i + tableBlueCells.length].length; j++)
        {
            // Create an option element
            var option = document.createElement("option");

            // Set the option text
            option.text = allPlayerIGNs[i + tableBlueCells.length][j];

            // Add the option to the select element
            tableCell.getElementsByTagName("select")[0].add(option);
        }
    }
}