﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace RetireSimple.Engine.Data.Expense {
	public class InvestmentTransfer {
		public int InvestmentTransferId { get; set; }
		public int SourceInvestmentId { get; set; }
		public Base.Investment SourceInvestment { get; set; }
		public int DestinationInvestmentId { get; set; }
		public Base.Investment DestinationInvestment { get; set; }
		public double Amount { get; set; }
		public double TransferDate { get; set; }
	}

	public class InvestmentTransferConfiguration : IEntityTypeConfiguration<InvestmentTransfer> {
		public void Configure(EntityTypeBuilder<InvestmentTransfer> builder) {
			builder.ToTable("InvestmentTransfers");
			builder.HasKey(e => e.InvestmentTransferId);
			builder.HasOne(e => e.SourceInvestment)
					.WithMany(e => e.TransfersFrom)
					.HasForeignKey(e => e.SourceInvestmentId)
					.IsRequired();
			builder.HasOne(e => e.DestinationInvestment)
					.WithMany(e => e.TransfersTo)
					.HasForeignKey(e => e.DestinationInvestmentId)
					.IsRequired();
			builder.Property(e => e.Amount)
					.IsRequired()
					.HasDefaultValue(0);
		}
	}
}