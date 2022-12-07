using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        
        public byte[] PasswordHash { get; set; }

        [Column(TypeName="BLOB")]
        public byte[] PasswordSalt { get; set; }
    }
}