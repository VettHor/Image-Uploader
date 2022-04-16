using ImagesController.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ImagesController.DBContext.Administrator
{
    public class AdministratorDBRepository
    {
        public bool Contains(string _email, string _password)
        {
            using (AdministratorDBContext myDBContext = new AdministratorDBContext())
            {
                return myDBContext.AdministratorDB.Any(adm =>
                    adm.Email == _email
                    && adm.Password == _password);
            }
        }
    }
}
