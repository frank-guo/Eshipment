using EShipment.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShipment.UnitOfWorks
{
  public interface IUnitOfWork
  {
    IRepository<T> Repository<T>() where T : class;

    void SaveChanges();
  }
}
