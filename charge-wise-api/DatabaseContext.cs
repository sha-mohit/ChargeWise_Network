using System.Data.Entity;

namespace charge_wise_api.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base("chargewisedb") { }
        public virtual DbSet<ChargeStations> ChargeStations { get; set; }
        public virtual DbSet<PlugInImages> PlugInImages { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChargeStations>().ToTable("ChargeStations");
            modelBuilder.Entity<PlugInImages>().ToTable("PlugInImages");

            modelBuilder.Entity<ChargeStations>().HasKey<int>(csid => csid.ChargeStationId);
            modelBuilder.Entity<PlugInImages>().HasKey<int>(plig => plig.Plugin_Image_Id);
            
        }
    }
}
