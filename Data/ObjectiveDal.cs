using AAM.Interfaces;
using AAM.Model;
using Microsoft.EntityFrameworkCore;

namespace AAM.Data
{
    public class ObjectiveDal : IObjective
    {

        private readonly ObjectiveAngularContext _db;

        public ObjectiveDal(ObjectiveAngularContext db)
        {
            _db = db;
        }

        public async Task CompleteObjective(long id)
        {
                var result = await _db.Objectives.FindAsync(id);
                if (result == null)
                {
                    throw new Exception();
                }
                result.CompletedDate = DateTime.Now;
                result.UpdatedDate = (DateTime)result.CompletedDate;
                await _db.SaveChangesAsync();
        }

        public async Task CreateOrUpdate(long id, Objective obj)
        {
            var result = await _db.Objectives.FindAsync(id);
            if (result == null)
            {
                await _db.AddAsync(new Objective(obj.Title, obj.Description, obj.CompleteByDate));
                await _db.SaveChangesAsync();
                return;
            }
            if (result.CompletedDate != null)
            {
                throw new Exception();
            }
            result.Title = obj.Title;
            result.Description = obj.Description;
            result.CompleteByDate = obj.CompleteByDate;
            result.UpdatedDate = DateTime.Now;
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Objective>> GetByTitleDescription(string? queryString)
        {
                var query = from x in _db.Objectives
                            where queryString == null || x.Title.Contains(queryString) || x.Description.Contains(queryString)
                            orderby x.CompletedDate ascending, x.CompleteByDate ascending
                            select x;
                return await query.ToListAsync();
        }

        public async Task DeleteObjective(long ID)
        {

            var obj = await _db.Objectives.FindAsync(ID);
            if (obj == null)
            {
                throw new Exception();
            }
                _db.Objectives.Remove(obj);
                await _db.SaveChangesAsync();
        }
        public async Task<Objective> GetObjectiveById(long id)
        {
            return await _db.Objectives.FindAsync(id);
        }
    }
}
