using AAM.Model;
using Microsoft.AspNetCore.Mvc;

namespace AAM.Interfaces
{
    public interface IObjective
    {
        Task DeleteObjective(long id);
        Task CompleteObjective(long id);
        Task CreateOrUpdate(long id, Objective obj);
        Task<IEnumerable<Objective>> GetByTitleDescription(string? searchBoxString);
        Task<Objective> GetObjectiveById(long id);
    }
}
