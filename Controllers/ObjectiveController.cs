using AAM.Interfaces;
using AAM.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AAM.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObjectiveController : ControllerBase
    {
        private readonly IObjective _dataAccess;

        public ObjectiveController(IObjective dataAccess)
        {
            this._dataAccess = dataAccess;
        }

        [HttpGet]
        [Route("{input?}")]
        [Route("search/{input?}")]
        public async Task<IActionResult> GetObjectives(string? input)
        {
                return Ok(await _dataAccess.GetByTitleDescription(input));
        }

        [HttpGet]
        [Route("objective/{id}")]
        public async Task<Objective> GetObjectiveById(long id)
        {
            return await _dataAccess.GetObjectiveById(id);
        }

        [HttpPatch]
        [Route("complete/{id}")]
        public async Task<IActionResult> CompleteObjective(long id)
        {
            //return BadRequest("Error completing objective");

            try
            {
                await _dataAccess.CompleteObjective(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to complete task");
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            try
            {
                await _dataAccess.DeleteObjective(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to delete task");
            }
        }

        [HttpPatch]
        [Route("addEdit/{id}")]
        [Route("addEdit")]
        public async Task<IActionResult> AddOrEditObjective(Objective obj, long id = -1)
        {
            try
            {
                await _dataAccess.CreateOrUpdate(id, obj);
                return Ok(id);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed try again");
            }
        }


    }
}
