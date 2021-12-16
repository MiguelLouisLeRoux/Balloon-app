using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace the_other_balloon_widget.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BalloonColoursController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public BalloonColoursController (IConfiguration configuration)
        {
            _configuration = configuration;
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
        public void Post(string colVal)
        {
            BalloonColoursDB reqColour = new BalloonColoursDB(_configuration);
            reqColour.RequestColour(colVal);
            reqColour.HandlingTrendingLimit();
        }

        [HttpPut]
        [Route("{colVal}/{reqVal}")]
        public void Put(string colVal, int reqVal)
        {
            BalloonColoursDB updateColourList = new BalloonColoursDB(_configuration);
            updateColourList.UpdateColour(colVal, reqVal);
            updateColourList.HandlingTrendingLimit();
        }

        [HttpPut]
        [Route("{timelimit}")]
        public void Put(int timelimit)
        {
            BalloonColoursDB updateTimeLimit = new BalloonColoursDB(_configuration);
            updateTimeLimit.UpdateTimeLimit(timelimit);
        }

        [HttpDelete]
        [Route("{colVal}")]
        public void Delete(string colVal)
        {
            BalloonColoursDB deleteColour = new BalloonColoursDB(_configuration);
            deleteColour.DeleteColour(colVal);
        }
    }
}