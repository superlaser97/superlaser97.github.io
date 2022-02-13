// Raw csv string for the rawCBResponses
var RawCBResponses_CSV = 
`44568.81943	Hingheru88	Available	Available	Available	Available	Available	Available	Available	Available	8
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
// Night 1A, Night 1B, Night 2A, Night 2B, Night 3A, Night 3B, Night 4A, Night 4B
class WeekRosterData
{
    constructor(Night1A, Night1B, Night2A, Night2B, Night3A, Night3B, Night4A, Night4B)
    {
        this.Night1A = Night1A;
        this.Night1B = Night1B;
        this.Night2A = Night2A;
        this.Night2B = Night2B;
        this.Night3A = Night3A;
        this.Night3B = Night3B;
        this.Night4A = Night4A;
        this.Night4B = Night4B;
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







// Array of RawCBScheduleResponses
var RawCBResponses = [];
// Array of PlayerDetails
var RawPlayerDetails = [];
// Array of PlayerOnBoards
var PlayersOnBoard = [];

// PlayersOnBoard working copy
var WC_PlayersOnBoard = [];

// WeekRosterData_Blue working copy
var WC_WeekRosterData_Blue = "";
// WeekRosterData_Red working copy
var WC_WeekRosterData_Red = "";






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
    AddDummyValuesToWeekRosterData();

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.CO.IGN,
        WC_WeekRosterData_Blue.Night1B.CO.IGN,
        WC_WeekRosterData_Blue.Night2A.CO.IGN,
        WC_WeekRosterData_Blue.Night2B.CO.IGN,
        WC_WeekRosterData_Blue.Night3A.CO.IGN,
        WC_WeekRosterData_Blue.Night3B.CO.IGN,
        WC_WeekRosterData_Blue.Night4A.CO.IGN,
        WC_WeekRosterData_Blue.Night4B.CO.IGN
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.XO.IGN,
        WC_WeekRosterData_Blue.Night1B.XO.IGN,
        WC_WeekRosterData_Blue.Night2A.XO.IGN,
        WC_WeekRosterData_Blue.Night2B.XO.IGN,
        WC_WeekRosterData_Blue.Night3A.XO.IGN,
        WC_WeekRosterData_Blue.Night3B.XO.IGN,
        WC_WeekRosterData_Blue.Night4A.XO.IGN,
        WC_WeekRosterData_Blue.Night4B.XO.IGN
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.Player1.IGN,
        WC_WeekRosterData_Blue.Night1B.Player1.IGN,
        WC_WeekRosterData_Blue.Night2A.Player1.IGN,
        WC_WeekRosterData_Blue.Night2B.Player1.IGN,
        WC_WeekRosterData_Blue.Night3A.Player1.IGN,
        WC_WeekRosterData_Blue.Night3B.Player1.IGN,
        WC_WeekRosterData_Blue.Night4A.Player1.IGN,
        WC_WeekRosterData_Blue.Night4B.Player1.IGN
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.Player2.IGN,
        WC_WeekRosterData_Blue.Night1B.Player2.IGN,
        WC_WeekRosterData_Blue.Night2A.Player2.IGN,
        WC_WeekRosterData_Blue.Night2B.Player2.IGN,
        WC_WeekRosterData_Blue.Night3A.Player2.IGN,
        WC_WeekRosterData_Blue.Night3B.Player2.IGN,
        WC_WeekRosterData_Blue.Night4A.Player2.IGN,
        WC_WeekRosterData_Blue.Night4B.Player2.IGN
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.Player3.IGN,
        WC_WeekRosterData_Blue.Night1B.Player3.IGN,
        WC_WeekRosterData_Blue.Night2A.Player3.IGN,
        WC_WeekRosterData_Blue.Night2B.Player3.IGN,
        WC_WeekRosterData_Blue.Night3A.Player3.IGN,
        WC_WeekRosterData_Blue.Night3B.Player3.IGN,
        WC_WeekRosterData_Blue.Night4A.Player3.IGN,
        WC_WeekRosterData_Blue.Night4B.Player3.IGN
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.Player4.IGN,
        WC_WeekRosterData_Blue.Night1B.Player4.IGN,
        WC_WeekRosterData_Blue.Night2A.Player4.IGN,
        WC_WeekRosterData_Blue.Night2B.Player4.IGN,
        WC_WeekRosterData_Blue.Night3A.Player4.IGN,
        WC_WeekRosterData_Blue.Night3B.Player4.IGN,
        WC_WeekRosterData_Blue.Night4A.Player4.IGN,
        WC_WeekRosterData_Blue.Night4B.Player4.IGN
    ]);

    // Update the rostering-table-blue
    AddTableRow("rostering-table-blue", [
        WC_WeekRosterData_Blue.Night1A.Player5.IGN,
        WC_WeekRosterData_Blue.Night1B.Player5.IGN,
        WC_WeekRosterData_Blue.Night2A.Player5.IGN,
        WC_WeekRosterData_Blue.Night2B.Player5.IGN,
        WC_WeekRosterData_Blue.Night3A.Player5.IGN,
        WC_WeekRosterData_Blue.Night3B.Player5.IGN,
        WC_WeekRosterData_Blue.Night4A.Player5.IGN,
        WC_WeekRosterData_Blue.Night4B.Player5.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.CO.IGN,
        WC_WeekRosterData_Red.Night1B.CO.IGN,
        WC_WeekRosterData_Red.Night2A.CO.IGN,
        WC_WeekRosterData_Red.Night2B.CO.IGN,
        WC_WeekRosterData_Red.Night3A.CO.IGN,
        WC_WeekRosterData_Red.Night3B.CO.IGN,
        WC_WeekRosterData_Red.Night4A.CO.IGN,
        WC_WeekRosterData_Red.Night4B.CO.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.XO.IGN,
        WC_WeekRosterData_Red.Night1B.XO.IGN,
        WC_WeekRosterData_Red.Night2A.XO.IGN,
        WC_WeekRosterData_Red.Night2B.XO.IGN,
        WC_WeekRosterData_Red.Night3A.XO.IGN,
        WC_WeekRosterData_Red.Night3B.XO.IGN,
        WC_WeekRosterData_Red.Night4A.XO.IGN,
        WC_WeekRosterData_Red.Night4B.XO.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.Player1.IGN,
        WC_WeekRosterData_Red.Night1B.Player1.IGN,
        WC_WeekRosterData_Red.Night2A.Player1.IGN,
        WC_WeekRosterData_Red.Night2B.Player1.IGN,
        WC_WeekRosterData_Red.Night3A.Player1.IGN,
        WC_WeekRosterData_Red.Night3B.Player1.IGN,
        WC_WeekRosterData_Red.Night4A.Player1.IGN,
        WC_WeekRosterData_Red.Night4B.Player1.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.Player2.IGN,
        WC_WeekRosterData_Red.Night1B.Player2.IGN,
        WC_WeekRosterData_Red.Night2A.Player2.IGN,
        WC_WeekRosterData_Red.Night2B.Player2.IGN,
        WC_WeekRosterData_Red.Night3A.Player2.IGN,
        WC_WeekRosterData_Red.Night3B.Player2.IGN,
        WC_WeekRosterData_Red.Night4A.Player2.IGN,
        WC_WeekRosterData_Red.Night4B.Player2.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.Player3.IGN,
        WC_WeekRosterData_Red.Night1B.Player3.IGN,
        WC_WeekRosterData_Red.Night2A.Player3.IGN,
        WC_WeekRosterData_Red.Night2B.Player3.IGN,
        WC_WeekRosterData_Red.Night3A.Player3.IGN,
        WC_WeekRosterData_Red.Night3B.Player3.IGN,
        WC_WeekRosterData_Red.Night4A.Player3.IGN,
        WC_WeekRosterData_Red.Night4B.Player3.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.Player4.IGN,
        WC_WeekRosterData_Red.Night1B.Player4.IGN,
        WC_WeekRosterData_Red.Night2A.Player4.IGN,
        WC_WeekRosterData_Red.Night2B.Player4.IGN,
        WC_WeekRosterData_Red.Night3A.Player4.IGN,
        WC_WeekRosterData_Red.Night3B.Player4.IGN,
        WC_WeekRosterData_Red.Night4A.Player4.IGN,
        WC_WeekRosterData_Red.Night4B.Player4.IGN
    ]);

    // Update the rostering-table-red
    AddTableRow("rostering-table-red", [
        WC_WeekRosterData_Red.Night1A.Player5.IGN,
        WC_WeekRosterData_Red.Night1B.Player5.IGN,
        WC_WeekRosterData_Red.Night2A.Player5.IGN,
        WC_WeekRosterData_Red.Night2B.Player5.IGN,
        WC_WeekRosterData_Red.Night3A.Player5.IGN,
        WC_WeekRosterData_Red.Night3B.Player5.IGN,
        WC_WeekRosterData_Red.Night4A.Player5.IGN,
        WC_WeekRosterData_Red.Night4B.Player5.IGN
    ]);
}

// Add dummy values into WC_WeekRosterData_Blue
function AddDummyValuesToWeekRosterData()
{
    // Initialize 56 dummy RawPlayerDetails
    var WC_RawPlayerDetail_1 = new RawPlayerDetail("Player1", "Clan1", "Type1", "Team1");
    var WC_RawPlayerDetail_2 = new RawPlayerDetail("Player2", "Clan2", "Type2", "Team2");
    var WC_RawPlayerDetail_3 = new RawPlayerDetail("Player3", "Clan3", "Type3", "Team3");
    var WC_RawPlayerDetail_4 = new RawPlayerDetail("Player4", "Clan4", "Type4", "Team4");
    var WC_RawPlayerDetail_5 = new RawPlayerDetail("Player5", "Clan5", "Type5", "Team5");
    var WC_RawPlayerDetail_6 = new RawPlayerDetail("Player6", "Clan6", "Type6", "Team6");
    var WC_RawPlayerDetail_7 = new RawPlayerDetail("Player7", "Clan7", "Type7", "Team7");
    var WC_RawPlayerDetail_8 = new RawPlayerDetail("Player8", "Clan8", "Type8", "Team8");
    var WC_RawPlayerDetail_9 = new RawPlayerDetail("Player9", "Clan9", "Type9", "Team9");
    var WC_RawPlayerDetail_10 = new RawPlayerDetail("Player10", "Clan10", "Type10", "Team10");
    var WC_RawPlayerDetail_11 = new RawPlayerDetail("Player11", "Clan11", "Type11", "Team11");
    var WC_RawPlayerDetail_12 = new RawPlayerDetail("Player12", "Clan12", "Type12", "Team12");
    var WC_RawPlayerDetail_13 = new RawPlayerDetail("Player13", "Clan13", "Type13", "Team13");
    var WC_RawPlayerDetail_14 = new RawPlayerDetail("Player14", "Clan14", "Type14", "Team14");
    var WC_RawPlayerDetail_15 = new RawPlayerDetail("Player15", "Clan15", "Type15", "Team15");
    var WC_RawPlayerDetail_16 = new RawPlayerDetail("Player16", "Clan16", "Type16", "Team16");
    var WC_RawPlayerDetail_17 = new RawPlayerDetail("Player17", "Clan17", "Type17", "Team17");
    var WC_RawPlayerDetail_18 = new RawPlayerDetail("Player18", "Clan18", "Type18", "Team18");
    var WC_RawPlayerDetail_19 = new RawPlayerDetail("Player19", "Clan19", "Type19", "Team19");
    var WC_RawPlayerDetail_20 = new RawPlayerDetail("Player20", "Clan20", "Type20", "Team20");
    var WC_RawPlayerDetail_21 = new RawPlayerDetail("Player21", "Clan21", "Type21", "Team21");
    var WC_RawPlayerDetail_22 = new RawPlayerDetail("Player22", "Clan22", "Type22", "Team22");
    var WC_RawPlayerDetail_23 = new RawPlayerDetail("Player23", "Clan23", "Type23", "Team23");
    var WC_RawPlayerDetail_24 = new RawPlayerDetail("Player24", "Clan24", "Type24", "Team24");
    var WC_RawPlayerDetail_25 = new RawPlayerDetail("Player25", "Clan25", "Type25", "Team25");
    var WC_RawPlayerDetail_26 = new RawPlayerDetail("Player26", "Clan26", "Type26", "Team26");
    var WC_RawPlayerDetail_27 = new RawPlayerDetail("Player27", "Clan27", "Type27", "Team27");
    var WC_RawPlayerDetail_28 = new RawPlayerDetail("Player28", "Clan28", "Type28", "Team28");
    var WC_RawPlayerDetail_29 = new RawPlayerDetail("Player29", "Clan29", "Type29", "Team29");
    var WC_RawPlayerDetail_30 = new RawPlayerDetail("Player30", "Clan30", "Type30", "Team30");
    var WC_RawPlayerDetail_31 = new RawPlayerDetail("Player31", "Clan31", "Type31", "Team31");
    var WC_RawPlayerDetail_32 = new RawPlayerDetail("Player32", "Clan32", "Type32", "Team32");
    var WC_RawPlayerDetail_33 = new RawPlayerDetail("Player33", "Clan33", "Type33", "Team33");
    var WC_RawPlayerDetail_34 = new RawPlayerDetail("Player34", "Clan34", "Type34", "Team34");
    var WC_RawPlayerDetail_35 = new RawPlayerDetail("Player35", "Clan35", "Type35", "Team35");
    var WC_RawPlayerDetail_36 = new RawPlayerDetail("Player36", "Clan36", "Type36", "Team36");
    var WC_RawPlayerDetail_37 = new RawPlayerDetail("Player37", "Clan37", "Type37", "Team37");
    var WC_RawPlayerDetail_38 = new RawPlayerDetail("Player38", "Clan38", "Type38", "Team38");
    var WC_RawPlayerDetail_39 = new RawPlayerDetail("Player39", "Clan39", "Type39", "Team39");
    var WC_RawPlayerDetail_40 = new RawPlayerDetail("Player40", "Clan40", "Type40", "Team40");
    var WC_RawPlayerDetail_41 = new RawPlayerDetail("Player41", "Clan41", "Type41", "Team41");
    var WC_RawPlayerDetail_42 = new RawPlayerDetail("Player42", "Clan42", "Type42", "Team42");
    var WC_RawPlayerDetail_43 = new RawPlayerDetail("Player43", "Clan43", "Type43", "Team43");
    var WC_RawPlayerDetail_44 = new RawPlayerDetail("Player44", "Clan44", "Type44", "Team44");
    var WC_RawPlayerDetail_45 = new RawPlayerDetail("Player45", "Clan45", "Type45", "Team45");
    var WC_RawPlayerDetail_46 = new RawPlayerDetail("Player46", "Clan46", "Type46", "Team46");
    var WC_RawPlayerDetail_47 = new RawPlayerDetail("Player47", "Clan47", "Type47", "Team47");
    var WC_RawPlayerDetail_48 = new RawPlayerDetail("Player48", "Clan48", "Type48", "Team48");
    var WC_RawPlayerDetail_49 = new RawPlayerDetail("Player49", "Clan49", "Type49", "Team49");
    var WC_RawPlayerDetail_50 = new RawPlayerDetail("Player50", "Clan50", "Type50", "Team50");
    var WC_RawPlayerDetail_51 = new RawPlayerDetail("Player51", "Clan51", "Type51", "Team51");
    var WC_RawPlayerDetail_52 = new RawPlayerDetail("Player52", "Clan52", "Type52", "Team52");
    var WC_RawPlayerDetail_53 = new RawPlayerDetail("Player53", "Clan53", "Type53", "Team53");
    var WC_RawPlayerDetail_54 = new RawPlayerDetail("Player54", "Clan54", "Type54", "Team54");
    var WC_RawPlayerDetail_55 = new RawPlayerDetail("Player55", "Clan55", "Type55", "Team55");
    var WC_RawPlayerDetail_56 = new RawPlayerDetail("Player56", "Clan56", "Type56", "Team56");

    // Initialize 4 NightRosterData
    var WC_NightRosterData_1A = new NightRosterData(WC_RawPlayerDetail_1, WC_RawPlayerDetail_2, WC_RawPlayerDetail_3, WC_RawPlayerDetail_4, WC_RawPlayerDetail_5, WC_RawPlayerDetail_6, WC_RawPlayerDetail_7);
    var WC_NightRosterData_2A = new NightRosterData(WC_RawPlayerDetail_8, WC_RawPlayerDetail_9, WC_RawPlayerDetail_10, WC_RawPlayerDetail_11, WC_RawPlayerDetail_12, WC_RawPlayerDetail_13, WC_RawPlayerDetail_14);
    var WC_NightRosterData_3A = new NightRosterData(WC_RawPlayerDetail_15, WC_RawPlayerDetail_16, WC_RawPlayerDetail_17, WC_RawPlayerDetail_18, WC_RawPlayerDetail_19, WC_RawPlayerDetail_20, WC_RawPlayerDetail_21);
    var WC_NightRosterData_4A = new NightRosterData(WC_RawPlayerDetail_22, WC_RawPlayerDetail_23, WC_RawPlayerDetail_24, WC_RawPlayerDetail_25, WC_RawPlayerDetail_26, WC_RawPlayerDetail_27, WC_RawPlayerDetail_28);
    var WC_NightRosterData_1B = new NightRosterData(WC_RawPlayerDetail_29, WC_RawPlayerDetail_30, WC_RawPlayerDetail_31, WC_RawPlayerDetail_32, WC_RawPlayerDetail_33, WC_RawPlayerDetail_34, WC_RawPlayerDetail_35);
    var WC_NightRosterData_2B = new NightRosterData(WC_RawPlayerDetail_36, WC_RawPlayerDetail_37, WC_RawPlayerDetail_38, WC_RawPlayerDetail_39, WC_RawPlayerDetail_40, WC_RawPlayerDetail_41, WC_RawPlayerDetail_42);
    var WC_NightRosterData_3B = new NightRosterData(WC_RawPlayerDetail_43, WC_RawPlayerDetail_44, WC_RawPlayerDetail_45, WC_RawPlayerDetail_46, WC_RawPlayerDetail_47, WC_RawPlayerDetail_48, WC_RawPlayerDetail_49);
    var WC_NightRosterData_4B = new NightRosterData(WC_RawPlayerDetail_50, WC_RawPlayerDetail_51, WC_RawPlayerDetail_52, WC_RawPlayerDetail_53, WC_RawPlayerDetail_54, WC_RawPlayerDetail_55, WC_RawPlayerDetail_56);

    // Initialize the WeekRosterData_Blue
    WC_WeekRosterData_Blue = new WeekRosterData(
        WC_NightRosterData_1A, 
        WC_NightRosterData_1B,
        WC_NightRosterData_2A,
        WC_NightRosterData_2B, 
        WC_NightRosterData_3A,
        WC_NightRosterData_3B,
        WC_NightRosterData_4A,
        WC_NightRosterData_4B);

    // Initialize the WeekRosterData_Red
    WC_WeekRosterData_Red = new WeekRosterData(
        WC_NightRosterData_1A, 
        WC_NightRosterData_1B,
        WC_NightRosterData_2A,
        WC_NightRosterData_2B, 
        WC_NightRosterData_3A,
        WC_NightRosterData_3B,
        WC_NightRosterData_4A,
        WC_NightRosterData_4B);
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
    //*************************************************
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



