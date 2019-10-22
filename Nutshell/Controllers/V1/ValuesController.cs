using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nutshell.Routes.V1;

namespace Nutshell.Controllers.V1
{
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        public ValuesController()
        {
        }

        [HttpGet(Api.Values.GetAll)]
        public IActionResult GetAll()
        {
            var values = new[] { "value 1", "value 2", "value 3" };
            return Ok(values);
        }

        [HttpGet(Api.Values.Get)]
        public IActionResult Get(int id)
        {
            var value = $"value {id}";
            return Ok(value);
        }
    }
}