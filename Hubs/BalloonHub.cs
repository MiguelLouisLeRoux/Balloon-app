using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;


namespace the_other_balloon_widget.Hubs
{
    public class BalloonHub : Hub
    {
        // public async Task GetBalloons(IEnumerable<BalloonColoursModel> balloonList)
        // {

        //     await Clients.All.SendAsync("GetBalloons", balloonList);
        // }
    }
}