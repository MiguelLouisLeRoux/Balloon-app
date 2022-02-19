using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;


namespace the_other_balloon_widget.Hubs
{
    public class BalloonHub : Hub
    {
        private readonly IConfiguration _configuration;
        public BalloonHub (IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task GetBalloons(IEnumerable<BalloonColoursModel> balloonList, int timelimit)
        {
            BalloonColoursDB getColourList = new BalloonColoursDB(_configuration);
            balloonList = getColourList.GettingBalloonColours();
            timelimit = getColourList.GetTimelimit();
            
            await Clients.All.SendAsync("GetBalloons", balloonList, timelimit);
        }
    }
}