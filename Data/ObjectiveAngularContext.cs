using System;
using System.Collections.Generic;
using AAM.Model;
using Microsoft.EntityFrameworkCore;

namespace AAM.Data;

public partial class ObjectiveAngularContext : DbContext
{
    public ObjectiveAngularContext()
    {
    }

    public ObjectiveAngularContext(DbContextOptions<ObjectiveAngularContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Objective> Objectives { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Objective>(entity =>
        {
            entity.ToTable("OBJECTIVE");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CompleteByDate).HasColumnName("COMPLETE_BY_DATE");
            entity.Property(e => e.CompletedDate).HasColumnName("COMPLETED_DATE");
            entity.Property(e => e.CreatedDate).HasColumnName("CREATED_DATE");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("DESCRIPTION");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .HasColumnName("TITLE");
            entity.Property(e => e.UpdatedDate).HasColumnName("UPDATED_DATE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
