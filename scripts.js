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
`Hingheru88	BOB	PLAYER
AnotherLazyBoy	VKNGS	CALLER
songinator	CLANA	PLAYER
swanno1	CLANA	PLAYER
adityakool15	CLANA	PLAYER
niklausmaximus	VKNGS	PLAYER
PunMasterWally	BOB	PLAYER
EyeDeeKayy	BOB	PLAYER
StAnDin_WoLfY	BOB	PLAYER
The_Crynek	CLANA	PLAYER
Jeremy07	VKNGS	PLAYER
Wolfcain	AUSNZ	CALLER
Arrcadedus_1	BOB	PLAYER
_Ducky_	VKNGS	CALLER
Spaceshiphaku	VKNGS	PLAYER
Cascayd	VKNGS	CALLER
Strik3agle98	CLANA	PLAYER
OniichanYamate	VKNGS	PLAYER
Wulffenhienze	BOB	PLAYER
Bob778_	BOB	PLAYER
ronalchn	VKNGS	PLAYER
Nilaos	VKNGS	PLAYER
BeardyBandit	BOB	PLAYER
niklausmaximus	VKNGS	PLAYER
Jordysiu915	VKNGS	PLAYER
Luc_defender	VKNGS	PLAYER
Bagpfbones78	VKNGS	CALLER
LiveOnEvil	VKNGS	PLAYER`;


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
// IGN, MaxNumSlots, Clan, Type, Remarks
class PlayerOnBoard
{
    constructor(IGN, MaxNumSlots, Clan, Type, Remarks)
    {
        this.IGN = IGN;
        this.MaxNumSlots = MaxNumSlots;
        this.Clan = Clan;
        this.Type = Type;
        this.Remarks = Remarks;
    }
}

// struct that stores a single RawPlayerDetail
// string IGN, Clan, Type
class RawPlayerDetail
{
    constructor(IGN, Clan, Type)
    {
        this.IGN = IGN;
        this.Clan = Clan;
        this.Type = Type;
    }
}

// Array of RawCBScheduleResponses
var RawCBResponses = [];
// Array of PlayerDetails
var RawPlayerDetails = [];
// Array of PlayerOnBoards
var PlayersOnBoard = [];

// PlayersOnBoard working copy
var WC_PlayersOnBoard = [];










// OnLoad
function OnLoad()
{
    // ************ TESTING PURPOSES ONLY ************
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
    //*************************************************
}

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

// Replace the RawCBScheduleResponses array with the a string of csv
// Update the RawCBScheduleResponses table
function SetRawCBResponses(csv)
{
    RawCBResponses = [];
    var lines = csv.split("\n");
    for (var i = 1; i < lines.length; i++)
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
        RawPlayerDetails.push(new RawPlayerDetail(ign, clan, type));
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
                PlayerDetail.Type
            ]);
    }
}

// Function to add a row to a table
function AddTableRow(tableID, values)
{
    var table = document.getElementById(tableID);
    var row = table.insertRow(-1);
    for (var i = 0; i < values.length; i++)
    {
        var cell = row.insertCell(-1);
        cell.innerHTML = values[i];
    }
}

// On generatePlayersOnBoard button click
function OnGeneratePlayersOnBoardBtn_Click()
{
    // Get the IGNs of players from rawcbresponses that have more than 0 maxnumslots
    var IGNs = [];
    for (var i = 0; i < RawCBResponses.length; i++)
    {
        var RawCBResponse = RawCBResponses[i];
        if (RawCBResponse.MaxNumSlots > 0)
        {
            IGNs.push(RawCBResponse.IGN);
        }
    }

    // Find duplicate entry in IGNs and store the duplicate entries
    var IGNsDuplicates = [];
    for (var i = 0; i < IGNs.length; i++)
    {
        var IGN = IGNs[i];
        for (var j = i + 1; j < IGNs.length; j++)
        {
            var IGN2 = IGNs[j];
            if (IGN == IGN2)
            {
                IGNsDuplicates.push(IGN);
            }
        }
    }

    // For each IGN in the IGNs array
    for (var i = 0; i < IGNs.length; i++)
    {
        var IGN = IGNs[i];
        
        // Get the maxNumSlots, clan, type of the player that has the IGN
        var maxNumSlots = 0;
        var clan = "";
        var type = "";
        // Flag that indicates if the player does not exist in the RawPlayerDetails array
        var playerDoesNotExist = false;
        // Flag that indicates if the player has duplicate in the IGNs array
        var playerHasDuplicate = false;

        for (var j = 0; j < RawCBResponses.length; j++)
        {
            var RawCBResponse = RawCBResponses[j];
            if (RawCBResponse.IGN == IGN)
            {
                maxNumSlots = RawCBResponse.MaxNumSlots;
                break;
            }
        }

        for (var j = 0; j < RawPlayerDetails.length; j++)
        {
            var RawPlayerDetail = RawPlayerDetails[j];
            if (RawPlayerDetail.IGN == IGN)
            {
                clan = RawPlayerDetail.Clan;
                type = RawPlayerDetail.Type;
                break;
            }
        }

        // Check if IGN exists in the IGNsDup array
        if (IGNsDuplicates.indexOf(IGN) != -1)
        {
            playerHasDuplicate = true;
        }
        // If the IGN is not in the raw player details array
        if (clan == "" || type == "")
        {
            playerDoesNotExist = true;
        }

        var Remarks = "";
        if (playerDoesNotExist)
        {
            Remarks += " [DOES NOT EXIST] ";
        }
        if(playerHasDuplicate)
        {
            Remarks += " [DUPLICATE] ";
        }

        // Add the player to the playersOnBoard array
        PlayersOnBoard.push(new PlayerOnBoard(IGN, clan, type, maxNumSlots, Remarks));

        // Update the playersOnBoard table
        AddTableRow(
            "playersOnBoard-table",
            [
                IGN,
                maxNumSlots,
                clan,
                type,
                Remarks
            ]);
    }
}

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