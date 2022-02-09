using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.AspNetCore.SignalR;
using Dapper;
using System.Data;
using System.Text.RegularExpressions;
using System.Linq;
using System.Threading.Tasks;

namespace the_other_balloon_widget
{
    public class BalloonColoursDB
    {
        private readonly IConfiguration _configuration; 

        public BalloonColoursDB (IConfiguration configuration) 
        {
            _configuration = configuration;
        }

        public IEnumerable<BalloonColoursModel> GettingBalloonColours()
        {
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring);
            con.Open();
            string sql = "SELECT * FROM ballooncolours;";
            List<BalloonColoursModel> coloursList = new List<BalloonColoursModel>();
            coloursList = con.Query<BalloonColoursModel>(sql).AsList();
            con.Close();
            return coloursList.ToArray();
        }

        public void RequestColour(string col) 
        {
            // Handling Display Colour Name
            string trim = col.Trim();
            string uppercase = trim[0].ToString().ToUpper() + trim.Substring(1);
            uppercase = Regex.Replace(uppercase, @"\b([a-z])", m => m.Value.ToUpper());

            // Hnadling CSS Colour Name
            string removespace = String.Concat(trim.Where(c => !Char.IsWhiteSpace(c)));
            string cssVal = removespace.ToLower();
           
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring);
            con.Open();
            string sql = $"INSERT INTO ballooncolours (cssStyleColourValue, colour, requests) VALUES ('{cssVal}', '{uppercase}', 1) ON CONFLICT (cssStyleColourValue) DO UPDATE SET requests = ballooncolours.requests + 1;";
            con.Execute(sql);

            var time = DateTime.Now;
            string sqladdDateToTrendingColours = $"UPDATE ballooncolours SET time = '{time.ToString()}' WHERE cssStyleColourValue = '{cssVal}' AND requests = 12;";
            con.Execute(sqladdDateToTrendingColours);
            con.Close();
        }

        public int GetTimelimit()
        {
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring);
            con.Open();
            string sql = $"SELECT timelimit FROM trendinglimit WHERE title = 'timelimit';";
            var limit = con.Query<int>(sql).ToArray();
            int thelimit = limit[0];
            con.Close();
            return thelimit;
        }

        public void UpdateTimeLimit(int timeVal)
        {
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring);
            con.Open();
            string sql = $"UPDATE trendinglimit SET timelimit = {timeVal} WHERE title = 'timelimit';";
            con.Execute(sql);
            con.Close();
        }

        public void HandlingTrendingLimit()
        {
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring);
            con.Open();

            List<BalloonColoursModel> coloursList = new List<BalloonColoursModel>();
            string getsqlList = "SELECT * FROM ballooncolours;";
            coloursList = con.Query<BalloonColoursModel>(getsqlList).AsList();
            var colArray = coloursList.ToArray();
            List<DateTime> trendingDates = new List<DateTime>();
            for (int i = 0; i < colArray.Length; i++)
            {
                var itt = colArray[i];
                if(itt.requests > 11)
                {
                    trendingDates.Add(itt.time);
                    if(trendingDates.Count > 3)
                    {
                        var earliestTrendingColour = trendingDates.Min();
                        string updatesql = $"UPDATE ballooncolours SET requests = 9, time = '01/01/0001 00:00:00' WHERE time = '{earliestTrendingColour.ToString()}';";
                        con.Execute(updatesql);
                    }
                }
            }
            con.Close();
        }

        public void UpdateColour(string colVal, int reqVal)
        {
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring);
            con.Open();
            if (reqVal <= 11)
            {
                string sql = $"UPDATE ballooncolours SET requests = {reqVal}, time = '01/01/0001 00:00:00' WHERE cssStyleColourValue = '{colVal}';";
                con.Execute(sql);
            }
            else if (reqVal > 11) 
            {
                var time = DateTime.Now;
                string sqladdDateToTrendingColours = $"UPDATE ballooncolours SET requests = {reqVal}, time = '{time.ToString()}' WHERE cssStyleColourValue = '{colVal}';";
                con.Execute(sqladdDateToTrendingColours);
            }
            con.Close();
        }

        public void DeleteColour(string colVal)
        {
            string connectionstring = _configuration.GetConnectionString("PSQLConnection");
            using NpgsqlConnection con = new NpgsqlConnection(connectionstring); 
            con.Open();
            string sql = $"DELETE FROM ballooncolours WHERE cssStyleColourValue = '{colVal}';";
            con.Execute(sql);
            con.Close(); 
        }
    }
}