using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AAM.Model;

public partial class Objective
{
    [Key]
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime CompleteByDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now;

    public DateTime UpdatedDate { get; set; } = DateTime.Now;

    public Objective(string title, string? description, DateTime completeByDate)
    {
        Title = title;
        Description = description;
        CompleteByDate = completeByDate;
    }
}
