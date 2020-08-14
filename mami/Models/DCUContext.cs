using asp_mvc_proj.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace mami.Models
{
    public class DCUContext : DbContext
    {
        public DbSet<DCUModel> DCUs { get; set; }
        public DbSet<DCUInfoModel> DCUInfo { get; set; }
        public DbSet<MeterModel> Meters { get; set; }
        public DbSet<MeterEnergyUsageModel> MeterEnergyUsage { get; set; }
        public DbSet<getHistoryDataModel> HistoryData { get; set; }
	    public DbSet<UserModel> Users { get; set; }
        public DbSet<LogModel> Logs { get; set; }
        public DbSet<GasMeterModel> GasMeter { get; set; }
        public DbSet<gasHistoryDataModel> GasHistory { get; set; }
        public DbSet<GasMeterVolumeModel> GasMeterVol { get; set; }
        public DbSet<WaterMeterModel> WaterMeter { get; set; }
        public DbSet<waterHistoryData> WaterHistory { get; set; }
        public DbSet<WaterMeterVolumeModel> WaterMeterVol { get; set; }
        public DbSet<ConsumersModel> Consumer { get; set; }
        public DbSet<MeteringPoint> Meterpoint { get; set; }
        public DbSet<TreeModel> Tree { get; set; }
        public DbSet<ConcentratorModel> Cons { get; set; }
        public DbSet<LoadProfileModel> LoadProfile { get; set; }
        public DbSet<GasGPRSMeter> GasGPRS { get; set; }
        public DbSet<GasReadHistoryModel> GasReadHistory { get; set; }
        public DbSet<UndefinedMeterModel> UndefinedMeter { get; set; }
    }
}