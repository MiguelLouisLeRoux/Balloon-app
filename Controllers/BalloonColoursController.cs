using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Npgsql;
using the_other_balloon_widget.Hubs;

namespace the_other_balloon_widget.Controllers
{
    [ApiController]
    [Route("[controller]")] 
    public class BalloonColoursController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly IHubContext<BalloonHub> _balloonHub;


        public BalloonColoursController (IConfiguration configuration, IHubContext<BalloonHub> balloonHub)
        {
            _configuration = configuration;

            _balloonHub = balloonHub;
        }

        [HttpGet]
        public IEnumerable<BalloonColoursModel> Get() 
        {
            BalloonColoursDB getColourList = new BalloonColoursDB(_configuration);
            return getColourList.GettingBalloonColours();
        }

        [HttpGet]
        [Route("{timelimit}")]
        public int Get(int timelimit)
        {
            BalloonColoursDB getTimeLimit = new BalloonColoursDB(_configuration);
            return getTimeLimit.GetTimelimit();
        }

        [HttpPost] 
        [Route("{colVal}")]
        public async Task Post(string colVal)
        {
            BalloonColoursDB reqColour = new BalloonColoursDB(_configuration);
            reqColour.RequestColour(colVal);
            reqColour.HandlingTrendingLimit();

            BalloonColoursDB getColourList = new BalloonColoursDB(_configuration);

            await _balloonHub.Clients.All.SendAsync("GetBalloons", getColourList.GettingBalloonColours());
        }

        [HttpPut]
        [Route("{colVal}/{reqVal}")]
        public async Task Put(string colVal, int reqVal)
        {
            BalloonColoursDB updateColourList = new BalloonColoursDB(_configuration);
            updateColourList.UpdateColour(colVal, reqVal);
            updateColourList.HandlingTrendingLimit();

            BalloonColoursDB getColourList = new BalloonColoursDB(_configuration);

            await _balloonHub.Clients.All.SendAsync("GetBalloons", getColourList.GettingBalloonColours());
        }

        [HttpPut]
        [Route("{timelimit}")]
        public async Task Put(int timelimit)
        {
            BalloonColoursDB updateTimeLimit = new BalloonColoursDB(_configuration);
            updateTimeLimit.UpdateTimeLimit(timelimit);

            BalloonColoursDB getColourList = new BalloonColoursDB(_configuration);

            await _balloonHub.Clients.All.SendAsync("GetBalloons", getColourList.GettingBalloonColours());
        }

        [HttpDelete]
        [Route("{colVal}")]
        public async Task Delete(string colVal)
        {
            BalloonColoursDB deleteColour = new BalloonColoursDB(_configuration);
            deleteColour.DeleteColour(colVal);

            BalloonColoursDB getColourList = new BalloonColoursDB(_configuration);

            await _balloonHub.Clients.All.SendAsync("GetBalloons", getColourList.GettingBalloonColours());
        }
    }
}