// Raw csv string for the rawCBResponses
var RawCBResponses_CSV = 
`44568.81943	Hingheru88	Available	Available		Available	Available		Available	Available	8
44568.8429	AnotherLazyBoy	Available		Available		Available	Available	Available		7
44568.85409	songinator	Available		Available		Available		Available		3
44568.86869	swanno1	Available		Available		Available		Available		4
44568.9138	adityakool15	Available								1
44568.943	niklausmaximus	Available	Available	Available	Available			Available		5
44569.43694	PunMasterWally	Available		Available				Available		2
44569.53216	EyeDeeKayy		Available		Available		Available		Available	8
44569.78107	StAnDin_WoLfY			Available		Available		Available		4
44569.89295	The_Crynek	Available		Available		Available	Available	Available		3
44569.92674	Jeremy07	Available	Available	Available	Available		Available		Available	8
44570.06959	Wolfcain	Available		Available		Available		Available		5
44570.49012	Arrcadedus_1									0
44570.49282	_Ducky_		Available		Available		Available		Available	4
44570.50172	Spaceshiphaku		Available		Available			Available	Available	4
44570.53309	Cascayd	Available	Available	Available	Available	Available	Available	Available	Available	6
44570.64245	Strik3agle98		Available		Available	Available	Available	Available	Available	2
44570.64384	OniichanYamate									0
44570.69061	Wulffenhienze		Available		Available		Available			4
44571.04427	Bob778_	Available		Available		Available			Available	3
44571.07648	ronalchn	Available		Available		Available	Available	Available	Available	6
44571.61114	Nilaos			Available						1
44571.64872	BeardyBandit			Available				Available		2
44571.91669	niklausmaximus			Available	Available				Available	6
44571.91758	Jordysiu915		Available		Available		Available			3
44571.92006	Luc_defender	Available	Available	Available				Available	Available	3
44571.93416	Bagpfbones78									0
44571.97723	LiveOnEvil									0`;

// Raw csv string for the rawplayerdetails
var RawPlayerDetail_CSV = 
`IGN	CLAN	TYPE	TEAM	ENTER BATTLE
Hingheru88	BOB	PLAYER	RED	YES
AnotherLazyBoy	VKNGS	CALLER	BLUE	
songinator	CLANA	PLAYER	RED	
swanno1	CLANA	PLAYER	BLUE	
adityakool15	CLANA	PLAYER	RED	
niklausmaximus	VKNGS	PLAYER	BLUE	
PunMasterWally	BOB	PLAYER	RED	
EyeDeeKayy	BOB	PLAYER	BLUE	YES
StAnDin_WoLfY	BOB	PLAYER	RED	
The_Crynek	CLANA	PLAYER	BLUE	
Jeremy07	VKNGS	PLAYER	RED	
Wolfcain	AUSNZ	CALLER	BLUE	
Arrcadedus_1	BOB	PLAYER	RED	
_Ducky_	VKNGS	CALLER	RED	
Spaceshiphaku	VKNGS	PLAYER	BLUE	
Cascayd	VKNGS	CALLER	RED	
Strik3agle98	CLANA	PLAYER	BLUE	
OniichanYamate	VKNGS	PLAYER	RED	
Wulffenhienze	BOB	PLAYER	BLUE	YES
Bob778_	BOB	PLAYER	RED	
ronalchn	VKNGS	PLAYER	BLUE	
Nilaos	VKNGS	PLAYER	RED	
BeardyBandit	BOB	PLAYER	BLUE	
niklausmaximus	VKNGS	PLAYER	RED	YES
Jordysiu915	VKNGS	PLAYER	BLUE	
Luc_defender	VKNGS	PLAYER	RED	
Bagpfbones78	VKNGS	CALLER	RED	
LiveOnEvil	VKNGS	PLAYER	BLUE	`;


// struct that stores a single RawCBScheduleResponse
class RawCBResponse
{
    constructor(Timestamp, IGN, Day1A, Day1B, Day2A, Day2B, Day3A, Day3B, Day4A, Day4B, MaxNumSlots)
    {
        this.Timestamp = Timestamp;
        this.IGN = IGN;
        this.Day1A = Day1A;
        this.Day1B = Day1B;
        this.Day2A = Day2A;
        this.Day2B = Day2B;
        this.Day3A = Day3A;
        this.Day3B = Day3B;
        this.Day4A = Day4A;
        this.Day4B = Day4B;
        this.MaxNumSlots = MaxNumSlots;
    }
}

// struct that stores a single PlayerOnBoard
// IGN, MaxNumSlots, Clan, Type, EnterBattle, Remarks, N1A, N1B, N2A, N2B, N3A, N3B, N4A, N4B
class PlayerOnBoard
{
    constructor(IGN, MaxNumSlots, Clan, Type, EnterBattle, Remarks, N1A, N1B, N2A, N2B, N3A, N3B, N4A, N4B)
    {
        this.IGN = IGN;
        this.MaxNumSlots = MaxNumSlots;
        this.Clan = Clan;
        this.Type = Type;
        this.EnterBattle = EnterBattle;
        this.Remarks = Remarks;

        this.N1A = N1A;
        this.N1B = N1B;
        this.N2A = N2A;
        this.N2B = N2B;
        this.N3A = N3A;
        this.N3B = N3B;
        this.N4A = N4A;
        this.N4B = N4B;
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
// Blue Night 1A, Blue Night 1B, Blue Night 2A, Blue Night 2B, Blue Night 3A, Blue Night 3B, Blue Night 4A, Blue Night 4B
// Red Night 1A, Red Night 1B, Red Night 2A, Red Night 2B, Red Night 3A, Red Night 3B, Red Night 4A, Red Night 4B
class WeekRosterData
{
    constructor(BlueNight1A, BlueNight1B, BlueNight2A, BlueNight2B, BlueNight3A, BlueNight3B, BlueNight4A, BlueNight4B,
                RedNight1A, RedNight1B, RedNight2A, RedNight2B, RedNight3A, RedNight3B, RedNight4A, RedNight4B)
    {
        this.BlueNight1A = BlueNight1A;
        this.BlueNight1B = BlueNight1B;
        this.BlueNight2A = BlueNight2A;
        this.BlueNight2B = BlueNight2B;
        this.BlueNight3A = BlueNight3A;
        this.BlueNight3B = BlueNight3B;
        this.BlueNight4A = BlueNight4A;
        this.BlueNight4B = BlueNight4B;

        this.RedNight1A = RedNight1A;
        this.RedNight1B = RedNight1B;
        this.RedNight2A = RedNight2A;
        this.RedNight2B = RedNight2B;
        this.RedNight3A = RedNight3A;
        this.RedNight3B = RedNight3B;
        this.RedNight4A = RedNight4A;
        this.RedNight4B = RedNight4B;
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
class PlayerRemarks
{
    static get DOESN_T_EXISTS() { return "DOESN'T EXISTS"; }
    static get NOT_PARTICIPATING() { return "NOT PARTICIPATING"; }
    static get DUPLICATE() { return "DUPLICATE"; }
}

// Static class that contains clan battle slots
// N1A, N1B, N2A, N2B, N3A, N3B, N4A, N4B
class ClanBattleSlots
{
    static get N1A() { return "N1A"; }
    static get N1B() { return "N1B"; }
    static get N2A() { return "N2A"; }
    static get N2B() { return "N2B"; }
    static get N3A() { return "N3A"; }
    static get N3B() { return "N3B"; }
    static get N4A() { return "N4A"; }
    static get N4B() { return "N4B"; }
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

// Randomize Seed
var RandomizeSeed = 1296106;
// GetPlayersAvailable call counter
var GetPlayersAvailableCallCounter = 0;




//******************* UI FUNCTIONS *********************

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
{
    // Get the csv from the textarea
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
    UpdatePlayersOnBoardTable();
}

// On generateWeekRosterData button click
function OnGenerateWeekRosterDataBtn_Click()
{
    AddPossiblePlayersToWeekRosterData();
    FilterPlayersFromCBSlots();
    UpdateRosteringTable();
}

//******************************************************





//******************* UPDATE UI FUNCTIONS **************

// Function that takes in table id and toggle it's visiblity
function ToggleTableVisibility(tableID)
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

// Function to add a row to a table
function AddTableRow(tableID, values, newclass = "")
{
    var table = document.getElementById(tableID);
    var row = table.insertRow(-1);
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
    for (var i = 0; i < PlayersOnBoard.length; i++)
    {
        var cellClass = ""
        var redCellClass = "redColoredTableRow";
        var darkCellClass = "darkColoredTableRow";

        // If the playeronboard remarks contains [NOT PARTICIPATING]
        if (PlayersOnBoard[i].Remarks.includes(PlayerRemarks.NOT_PARTICIPATING))
        {
            cellClass = darkCellClass;
        }
        // Else if the playeronboard remarks contains [DUPLICATE] or [DOESN'T EXIST]
        else if (PlayersOnBoard[i].Remarks.includes(PlayerRemarks.DUPLICATE) || PlayersOnBoard[i].Remarks.includes(PlayerRemarks.DOESN_T_EXISTS))
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
                PlayersOnBoard[i].EnterBattle,
                PlayersOnBoard[i].Remarks,
                PlayersOnBoard[i].N1A,
                PlayersOnBoard[i].N1B,
                PlayersOnBoard[i].N2A,
                PlayersOnBoard[i].N2B,
                PlayersOnBoard[i].N3A,
                PlayersOnBoard[i].N3B,
                PlayersOnBoard[i].N4A,
                PlayersOnBoard[i].N4B,
            ],
            cellClass);
    }
}

// Function to update the RawCBScheduleResponses table
function UpdateRawCBResponsesTable()
{
    // Replace all occurance of "Available" with "X"
    for (var i = 0; i < RawCBResponses.length; i++)
    {
        var RawCBResponse = RawCBResponses[i];
        RawCBResponse.Day1A = RawCBResponse.Day1A.replace("Available", "X");
        RawCBResponse.Day1B = RawCBResponse.Day1B.replace("Available", "X");
        RawCBResponse.Day2A = RawCBResponse.Day2A.replace("Available", "X");
        RawCBResponse.Day2B = RawCBResponse.Day2B.replace("Available", "X");
        RawCBResponse.Day3A = RawCBResponse.Day3A.replace("Available", "X");
        RawCBResponse.Day3B = RawCBResponse.Day3B.replace("Available", "X");
        RawCBResponse.Day4A = RawCBResponse.Day4A.replace("Available", "X");
        RawCBResponse.Day4B = RawCBResponse.Day4B.replace("Available", "X");
    }

    // Update the RawCBScheduleResponses table
    for (var i = 0; i < RawCBResponses.length; i++)
    {
        var RawCBResponse = RawCBResponses[i];
        AddTableRow(
            "rawCBResponses-table", 
            [
                RawCBResponse.Timestamp, 
                RawCBResponse.IGN, 
                RawCBResponse.Day1A, 
                RawCBResponse.Day1B, 
                RawCBResponse.Day2A, 
                RawCBResponse.Day2B, 
                RawCBResponse.Day3A, 
                RawCBResponse.Day3B, 
                RawCBResponse.Day4A, 
                RawCBResponse.Day4B,
                RawCBResponse.MaxNumSlots
            ]);
    }
}

// Update rostering-table-blue with WC_WeekRosterData (WeekRosterData)
function UpdateRosteringTable()
{
    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.CO, WC_WeekRosterData.BlueNight1A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.CO, WC_WeekRosterData.BlueNight1B.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.CO, WC_WeekRosterData.BlueNight2A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.CO, WC_WeekRosterData.BlueNight2B.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.CO, WC_WeekRosterData.BlueNight3A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.CO, WC_WeekRosterData.BlueNight3B.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.CO, WC_WeekRosterData.BlueNight4A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.CO, WC_WeekRosterData.BlueNight4B.CO[0]),
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.XO, WC_WeekRosterData.BlueNight1A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.XO, WC_WeekRosterData.BlueNight1B.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.XO, WC_WeekRosterData.BlueNight2A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.XO, WC_WeekRosterData.BlueNight2B.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.XO, WC_WeekRosterData.BlueNight3A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.XO, WC_WeekRosterData.BlueNight3B.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.XO, WC_WeekRosterData.BlueNight4A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.XO, WC_WeekRosterData.BlueNight4B.XO[0]),
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.Player1, WC_WeekRosterData.BlueNight1A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.Player1, WC_WeekRosterData.BlueNight1B.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.Player1, WC_WeekRosterData.BlueNight2A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.Player1, WC_WeekRosterData.BlueNight2B.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.Player1, WC_WeekRosterData.BlueNight3A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.Player1, WC_WeekRosterData.BlueNight3B.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.Player1, WC_WeekRosterData.BlueNight4A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.Player1, WC_WeekRosterData.BlueNight4B.Player1[0]),
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.Player2, WC_WeekRosterData.BlueNight1A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.Player2, WC_WeekRosterData.BlueNight1B.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.Player2, WC_WeekRosterData.BlueNight2A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.Player2, WC_WeekRosterData.BlueNight2B.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.Player2, WC_WeekRosterData.BlueNight3A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.Player2, WC_WeekRosterData.BlueNight3B.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.Player2, WC_WeekRosterData.BlueNight4A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.Player2, WC_WeekRosterData.BlueNight4B.Player2[0]),
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.Player3, WC_WeekRosterData.BlueNight1A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.Player3, WC_WeekRosterData.BlueNight1B.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.Player3, WC_WeekRosterData.BlueNight2A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.Player3, WC_WeekRosterData.BlueNight2B.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.Player3, WC_WeekRosterData.BlueNight3A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.Player3, WC_WeekRosterData.BlueNight3B.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.Player3, WC_WeekRosterData.BlueNight4A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.Player3, WC_WeekRosterData.BlueNight4B.Player3[0]),
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.Player4, WC_WeekRosterData.BlueNight1A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.Player4, WC_WeekRosterData.BlueNight1B.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.Player4, WC_WeekRosterData.BlueNight2A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.Player4, WC_WeekRosterData.BlueNight2B.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.Player4, WC_WeekRosterData.BlueNight3A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.Player4, WC_WeekRosterData.BlueNight3B.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.Player4, WC_WeekRosterData.BlueNight4A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.Player4, WC_WeekRosterData.BlueNight4B.Player4[0]),
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1A.Player5, WC_WeekRosterData.BlueNight1A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight1B.Player5, WC_WeekRosterData.BlueNight1B.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2A.Player5, WC_WeekRosterData.BlueNight2A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight2B.Player5, WC_WeekRosterData.BlueNight2B.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3A.Player5, WC_WeekRosterData.BlueNight3A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight3B.Player5, WC_WeekRosterData.BlueNight3B.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4A.Player5, WC_WeekRosterData.BlueNight4A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.BlueNight4B.Player5, WC_WeekRosterData.BlueNight4B.Player5[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.CO, WC_WeekRosterData.RedNight1A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.CO, WC_WeekRosterData.RedNight1B.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.CO, WC_WeekRosterData.RedNight2A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.CO, WC_WeekRosterData.RedNight2B.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.CO, WC_WeekRosterData.RedNight3A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.CO, WC_WeekRosterData.RedNight3B.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.CO, WC_WeekRosterData.RedNight4A.CO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.CO, WC_WeekRosterData.RedNight4B.CO[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.XO, WC_WeekRosterData.RedNight1A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.XO, WC_WeekRosterData.RedNight1B.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.XO, WC_WeekRosterData.RedNight2A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.XO, WC_WeekRosterData.RedNight2B.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.XO, WC_WeekRosterData.RedNight3A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.XO, WC_WeekRosterData.RedNight3B.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.XO, WC_WeekRosterData.RedNight4A.XO[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.XO, WC_WeekRosterData.RedNight4B.XO[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.Player1, WC_WeekRosterData.RedNight1A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.Player1, WC_WeekRosterData.RedNight1B.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.Player1, WC_WeekRosterData.RedNight2A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.Player1, WC_WeekRosterData.RedNight2B.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.Player1, WC_WeekRosterData.RedNight3A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.Player1, WC_WeekRosterData.RedNight3B.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.Player1, WC_WeekRosterData.RedNight4A.Player1[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.Player1, WC_WeekRosterData.RedNight4B.Player1[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.Player2, WC_WeekRosterData.RedNight1A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.Player2, WC_WeekRosterData.RedNight1B.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.Player2, WC_WeekRosterData.RedNight2A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.Player2, WC_WeekRosterData.RedNight2B.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.Player2, WC_WeekRosterData.RedNight3A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.Player2, WC_WeekRosterData.RedNight3B.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.Player2, WC_WeekRosterData.RedNight4A.Player2[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.Player2, WC_WeekRosterData.RedNight4B.Player2[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.Player3, WC_WeekRosterData.RedNight1A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.Player3, WC_WeekRosterData.RedNight1B.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.Player3, WC_WeekRosterData.RedNight2A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.Player3, WC_WeekRosterData.RedNight2B.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.Player3, WC_WeekRosterData.RedNight3A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.Player3, WC_WeekRosterData.RedNight3B.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.Player3, WC_WeekRosterData.RedNight4A.Player3[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.Player3, WC_WeekRosterData.RedNight4B.Player3[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.Player4, WC_WeekRosterData.RedNight1A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.Player4, WC_WeekRosterData.RedNight1B.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.Player4, WC_WeekRosterData.RedNight2A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.Player4, WC_WeekRosterData.RedNight2B.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.Player4, WC_WeekRosterData.RedNight3A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.Player4, WC_WeekRosterData.RedNight3B.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.Player4, WC_WeekRosterData.RedNight4A.Player4[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.Player4, WC_WeekRosterData.RedNight4B.Player4[0]),
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1A.Player5, WC_WeekRosterData.RedNight1A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight1B.Player5, WC_WeekRosterData.RedNight1B.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2A.Player5, WC_WeekRosterData.RedNight2A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight2B.Player5, WC_WeekRosterData.RedNight2B.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3A.Player5, WC_WeekRosterData.RedNight3A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight3B.Player5, WC_WeekRosterData.RedNight3B.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4A.Player5, WC_WeekRosterData.RedNight4A.Player5[0]),
        GenerateSelectForRosteringTable(WC_WeekRosterData.RedNight4B.Player5, WC_WeekRosterData.RedNight4B.Player5[0]),
    ]);
}

// Function that returns a formatted string of a html select element
// Takes in a list of string
// Takes in the string
// html class "tableSelect"
function GenerateSelectForRosteringTable(players, selected)
{
    var select = "<select class='tableSelect'>";
    for (var i = 0; i < players.length; i++)
    {
        select += "<option value='" + players[i].IGN + "'" + (players[i].IGN == selected ? " selected" : "") + ">" + players[i].IGN + "</option>";
    }
    select += "</select>";
    return select;
}

//******************************************************








// OnLoad
function OnLoad()
{
    // ************ TESTING PURPOSES ONLY ************
    // TO AUTO GENERATE THE WEEK ROSTER DATA FROM DUMMY DATA
    // DO NOT USE THIS IN PRODUCTION
    // ***********************************************

    // Update textarea rawCBResponses-textarea with the rawCBResponse_CSV
    document.getElementById("rawCBResponses-textarea").value = RawCBResponses_CSV;

    // Update textarea rawPlayerDetails-textarea with the rawPlayerDetails_CSV
    document.getElementById("rawPlayerDetails-textarea").value = RawPlayerDetail_CSV;

    // Set the RawCBScheduleResponses array
    SetRawCBResponses(RawCBResponses_CSV);
    // Update the RawCBScheduleResponses table
    UpdateRawCBResponsesTable();

    // Set the PlayerDetails array
    SetRawPlayerDetails(RawPlayerDetail_CSV);
    // Update the PlayerDetails array
    UpdateRawPlayerDetailsTable();
    
    GeneratePlayersOnboard();
    UpdatePlayersOnBoardTable();

    GenerateWC_PlayersOnboard();
    
    AddPossiblePlayersToWeekRosterData();
    UpdateRosteringTable();
    //*************************************************
}

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
            case ClanBattleSlots.N1A:
                if (WC_PlayersOnBoard[i].N1A == "X") available = true;
                break;
            case ClanBattleSlots.N1B:
                if (WC_PlayersOnBoard[i].N1B == "X") available = true;
                break;
            case ClanBattleSlots.N2A:
                if (WC_PlayersOnBoard[i].N2A == "X") available = true;
                break;
            case ClanBattleSlots.N2B:
                if (WC_PlayersOnBoard[i].N2B == "X") available = true;
                break;
            case ClanBattleSlots.N3A:
                if (WC_PlayersOnBoard[i].N3A == "X") available = true;
                break;
            case ClanBattleSlots.N3B:
                if (WC_PlayersOnBoard[i].N3B == "X") available = true;
                break;
            case ClanBattleSlots.N4A:
                if (WC_PlayersOnBoard[i].N4A == "X") available = true;
                break;
            case ClanBattleSlots.N4B:
                if (WC_PlayersOnBoard[i].N4B == "X") available = true;
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
    playersAvailable = ReorderArray(playersAvailable, RandomizeSeed + GetPlayersAvailableCallCounter );

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
        var timestamp = values[0];
        var ign = values[1];
        var day1a = values[2];
        var day1b = values[3];
        var day2a = values[4];
        var day2b = values[5];
        var day3a = values[6];
        var day3b = values[7];
        var day4a = values[8];
        var day4b = values[9];
        var maxNumSlots = values[10];
        RawCBResponses.push(new RawCBResponse(timestamp, ign, day1a, day1b, day2a, day2b, day3a, day3b, day4a, day4b, maxNumSlots));
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
        var type = "";
        var enterBattle = "";
        var remarks = "";

        var N1A = "";
        var N1B = "";
        var N2A = "";
        var N2B = "";
        var N3A = "";
        var N3B = "";
        var N4A = "";
        var N4B = "";

        // Get the player's clan and type from the rawplayerdetails array
        for (var j = 0; j < RawPlayerDetails.length; j++)
        {
            var RawPlayerDetail = RawPlayerDetails[j];
            if (RawPlayerDetail.IGN == playerIGNs[i])
            {
                clan = RawPlayerDetail.Clan;
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

                N1A = RawCBResponse.Day1A;
                N1B = RawCBResponse.Day1B;
                N2A = RawCBResponse.Day2A;
                N2B = RawCBResponse.Day2B;
                N3A = RawCBResponse.Day3A;
                N3B = RawCBResponse.Day3B;
                N4A = RawCBResponse.Day4A;
                N4B = RawCBResponse.Day4B;
            }
        }

        // if clan and type are empty
        if (clan == "" && type == "")
        {
            remarks += PlayerRemarks.DOESN_T_EXISTS;
        }

        // if maxnumslots is 0
        if (maxNumSlots == 0)
        {
            remarks += PlayerRemarks.NOT_PARTICIPATING;
        }

        // if playerIGN is in the playerIGNDuplicates array
        if (playerIGNDuplicates.indexOf(playerIGNs[i]) != -1)
        {
            remarks += PlayerRemarks.DUPLICATE;
        }

        // Add the player to the playersOnBoard array
        PlayersOnBoard.push(new PlayerOnBoard(playerIGNs[i], maxNumSlots, clan, type, enterBattle, remarks, N1A, N1B, N2A, N2B, N3A, N3B, N4A, N4B));
    }
}

function GenerateWC_PlayersOnboard()
{
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
        if (player.Remarks.indexOf(PlayerRemarks.NOT_PARTICIPATING) != -1 || player.Remarks.indexOf(PlayerRemarks.DOESN_T_EXISTS) != -1)
        {
            notParticipatingOrDoesntExistPlayers.push(player.IGN);
        }
    }

    // Remove the players who are not participating or does not exist from the wcPlayersOnBoard array
    for (var i = 0; i < WC_PlayersOnBoard.length; i++)
    {
        var player = WC_PlayersOnBoard[i];
        if (notParticipatingOrDoesntExistPlayers.indexOf(player.IGN) != -1)
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
        if (player.Remarks.includes(PlayerRemarks.DUPLICATE))
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

    // Show duplicate players in the console
    for (var i = 0; i < playerIGNDuplicates.length; i++)
    {
        console.log("DUPLICATE: " + playerIGNDuplicates[i]);
    }

    // Show players on board length and wc_players on board length
    console.log("Players on board length: " + PlayersOnBoard.length);
    console.log("WC_Players on board length: " + WC_PlayersOnBoard.length);
}

// Add possible players into WC_WeekRosterData
function AddPossiblePlayersToWeekRosterData() 
{
    // Initlaize the players in the week roster data array (blue)
    var Night_Blue_1A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Blue_1A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Blue_1A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Blue_1A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Blue_1A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Blue_1A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Blue_1A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);

    var Night_Blue_1A_Players = FilterPlayersFromCBSlots([Night_Blue_1A_CO, Night_Blue_1A_XO, Night_Blue_1A_P1, Night_Blue_1A_P2, Night_Blue_1A_P3, Night_Blue_1A_P4, Night_Blue_1A_P5], TeamType.BLUE);
    Night_Blue_1A_CO = Night_Blue_1A_Players[0];
    Night_Blue_1A_XO = Night_Blue_1A_Players[1];
    Night_Blue_1A_P1 = Night_Blue_1A_Players[2];
    Night_Blue_1A_P2 = Night_Blue_1A_Players[3];
    Night_Blue_1A_P3 = Night_Blue_1A_Players[4];
    Night_Blue_1A_P4 = Night_Blue_1A_Players[5];
    Night_Blue_1A_P5 = Night_Blue_1A_Players[6];

    var Night_Blue_1B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_1B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_1B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_1B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_1B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_1B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_1B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Blue_2A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Blue_2A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Blue_2A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Blue_2A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Blue_2A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Blue_2A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Blue_2A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);

    var Night_Blue_2B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Blue_2B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Blue_2B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Blue_2B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Blue_2B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Blue_2B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Blue_2B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    
    var Night_Blue_3A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Blue_3A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Blue_3A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Blue_3A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Blue_3A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Blue_3A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Blue_3A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    
    var Night_Blue_3B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Blue_3B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Blue_3B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Blue_3B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Blue_3B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Blue_3B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Blue_3B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    
    var Night_Blue_4A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Blue_4A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Blue_4A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Blue_4A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Blue_4A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Blue_4A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Blue_4A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    
    var Night_Blue_4B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Blue_4B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Blue_4B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Blue_4B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Blue_4B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Blue_4B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Blue_4B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);

    // Initlaize the players in the week roster data array (red)
    var Night_Red_1A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Red_1A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Red_1A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Red_1A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Red_1A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Red_1A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    var Night_Red_1A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1A);
    
    var Night_Red_1B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Red_1B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Red_1B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Red_1B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Red_1B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Red_1B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    var Night_Red_1B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N1B);
    
    var Night_Red_2A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Red_2A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Red_2A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Red_2A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Red_2A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Red_2A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    var Night_Red_2A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2A);
    
    var Night_Red_2B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Red_2B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Red_2B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Red_2B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Red_2B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Red_2B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    var Night_Red_2B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N2B);
    
    var Night_Red_3A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Red_3A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Red_3A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Red_3A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Red_3A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Red_3A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    var Night_Red_3A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3A);
    
    var Night_Red_3B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Red_3B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Red_3B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Red_3B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Red_3B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Red_3B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    var Night_Red_3B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N3B);
    
    var Night_Red_4A_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Red_4A_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Red_4A_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Red_4A_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Red_4A_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Red_4A_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    var Night_Red_4A_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4A);
    
    var Night_Red_4B_CO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Red_4B_XO = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Red_4B_P1 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Red_4B_P2 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Red_4B_P3 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Red_4B_P4 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);
    var Night_Red_4B_P5 = GetPlayersAvailableInCBSlot(ClanBattleSlots.N4B);

    // Initialize 8 NightRosterData (Blue)
    var WC_NightRosterData_Blue_1A = new NightRosterData(Night_Blue_1A_CO, Night_Blue_1A_XO, Night_Blue_1A_P1, Night_Blue_1A_P2, Night_Blue_1A_P3, Night_Blue_1A_P4, Night_Blue_1A_P5);
    var WC_NightRosterData_Blue_1B = new NightRosterData(Night_Blue_1B_CO, Night_Blue_1B_XO, Night_Blue_1B_P1, Night_Blue_1B_P2, Night_Blue_1B_P3, Night_Blue_1B_P4, Night_Blue_1B_P5);
    var WC_NightRosterData_Blue_2A = new NightRosterData(Night_Blue_2A_CO, Night_Blue_2A_XO, Night_Blue_2A_P1, Night_Blue_2A_P2, Night_Blue_2A_P3, Night_Blue_2A_P4, Night_Blue_2A_P5);
    var WC_NightRosterData_Blue_2B = new NightRosterData(Night_Blue_2B_CO, Night_Blue_2B_XO, Night_Blue_2B_P1, Night_Blue_2B_P2, Night_Blue_2B_P3, Night_Blue_2B_P4, Night_Blue_2B_P5);
    var WC_NightRosterData_Blue_3A = new NightRosterData(Night_Blue_3A_CO, Night_Blue_3A_XO, Night_Blue_3A_P1, Night_Blue_3A_P2, Night_Blue_3A_P3, Night_Blue_3A_P4, Night_Blue_3A_P5);
    var WC_NightRosterData_Blue_3B = new NightRosterData(Night_Blue_3B_CO, Night_Blue_3B_XO, Night_Blue_3B_P1, Night_Blue_3B_P2, Night_Blue_3B_P3, Night_Blue_3B_P4, Night_Blue_3B_P5);
    var WC_NightRosterData_Blue_4A = new NightRosterData(Night_Blue_4A_CO, Night_Blue_4A_XO, Night_Blue_4A_P1, Night_Blue_4A_P2, Night_Blue_4A_P3, Night_Blue_4A_P4, Night_Blue_4A_P5);
    var WC_NightRosterData_Blue_4B = new NightRosterData(Night_Blue_4B_CO, Night_Blue_4B_XO, Night_Blue_4B_P1, Night_Blue_4B_P2, Night_Blue_4B_P3, Night_Blue_4B_P4, Night_Blue_4B_P5);

    
    // Initialize 8 NightRosterData (Red)
    var WC_NightRosterData_Red_1A = new NightRosterData(Night_Red_1A_CO, Night_Red_1A_XO, Night_Red_1A_P1, Night_Red_1A_P2, Night_Red_1A_P3, Night_Red_1A_P4, Night_Red_1A_P5);
    var WC_NightRosterData_Red_1B = new NightRosterData(Night_Red_1B_CO, Night_Red_1B_XO, Night_Red_1B_P1, Night_Red_1B_P2, Night_Red_1B_P3, Night_Red_1B_P4, Night_Red_1B_P5);
    var WC_NightRosterData_Red_2A = new NightRosterData(Night_Red_2A_CO, Night_Red_2A_XO, Night_Red_2A_P1, Night_Red_2A_P2, Night_Red_2A_P3, Night_Red_2A_P4, Night_Red_2A_P5);
    var WC_NightRosterData_Red_2B = new NightRosterData(Night_Red_2B_CO, Night_Red_2B_XO, Night_Red_2B_P1, Night_Red_2B_P2, Night_Red_2B_P3, Night_Red_2B_P4, Night_Red_2B_P5);
    var WC_NightRosterData_Red_3A = new NightRosterData(Night_Red_3A_CO, Night_Red_3A_XO, Night_Red_3A_P1, Night_Red_3A_P2, Night_Red_3A_P3, Night_Red_3A_P4, Night_Red_3A_P5);
    var WC_NightRosterData_Red_3B = new NightRosterData(Night_Red_3B_CO, Night_Red_3B_XO, Night_Red_3B_P1, Night_Red_3B_P2, Night_Red_3B_P3, Night_Red_3B_P4, Night_Red_3B_P5);
    var WC_NightRosterData_Red_4A = new NightRosterData(Night_Red_4A_CO, Night_Red_4A_XO, Night_Red_4A_P1, Night_Red_4A_P2, Night_Red_4A_P3, Night_Red_4A_P4, Night_Red_4A_P5);
    var WC_NightRosterData_Red_4B = new NightRosterData(Night_Red_4B_CO, Night_Red_4B_XO, Night_Red_4B_P1, Night_Red_4B_P2, Night_Red_4B_P3, Night_Red_4B_P4, Night_Red_4B_P5);

    // Initialize the WeekRosterData
    WC_WeekRosterData = new WeekRosterData(
        WC_NightRosterData_Blue_1A, 
        WC_NightRosterData_Blue_1B,
        WC_NightRosterData_Blue_2A,
        WC_NightRosterData_Blue_2B, 
        WC_NightRosterData_Blue_3A,
        WC_NightRosterData_Blue_3B,
        WC_NightRosterData_Blue_4A,
        WC_NightRosterData_Blue_4B,
        
        WC_NightRosterData_Red_1A, 
        WC_NightRosterData_Red_1B,
        WC_NightRosterData_Red_2A,
        WC_NightRosterData_Red_2B, 
        WC_NightRosterData_Red_3A,
        WC_NightRosterData_Red_3B,
        WC_NightRosterData_Red_4A,
        WC_NightRosterData_Red_4B);
}

// Function to randomize an array order and return it
// Parametmer to a seed string to randomize the array in a consistent way
function ReorderArray(array, seed) 
{
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(random(seed) * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed;
    }
  
    return array;
  }
  
  function random(seed) 
  {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
  }


// Function that filters players
// teamType: "Blue" or "Red" - the team for the session
function FilterPlayersFromCBSlots(playersInWatch, teamType)
{
    // Create temporary arrays to store the players to be filtered
    // Tag the temporay variable as temp_teamFilter
    // Copy array to temporary array
    var temp_teamFilter_players = [];
    for (var i = 0; i < playersInWatch.length; i++)
    {
        temp_teamFilter_players.push(playersInWatch[i]);
    }

    // Filter the players from red team if this is a blue team session
    if(teamType === TeamType.BLUE)
    {
        // Foreach temp_teamFilter_players
        for(var i = 0; i < temp_teamFilter_players.length; i++)
        {
            // If the player is not in the Blue team
            if(temp_teamFilter_players[i].team !== TeamType.BLUE)
            {
                // Remove the player from the temp_teamFilter_players array
                temp_teamFilter_players.splice(i, 1);
                --i;
            }
        }
    }

    // Compare the playersInWatch array to the temp_teamFilter_players array
    // If the player in playersInWatchis not in the temp_teamFilter_players array
    // Remove player from playersInWatch array
    for(var i = 0; i < playersInWatch.length; i++)
    {
        if(temp_teamFilter_players.indexOf(playersInWatch[i]) === -1)
        {
            playersInWatch.splice(i, 1);
            --i;
        }
    }
    

    return playersInWatch;
}