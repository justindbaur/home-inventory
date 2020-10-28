using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HomeInventory.Shared.Entities
{
    public class UnitOfMeasure
    {
        [Key]
        [MaxLength(50)]
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public bool IsCustom { get; set; }
        public bool IsConvertible { get; set; }


        public static readonly List<UnitOfMeasure> DefaultItems = new List<UnitOfMeasure>
        {
            new UnitOfMeasure
            {
                Name = "Ounce",
                Abbreviation = "oz",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Feet",
                Abbreviation = "ft",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Gallon",
                Abbreviation = "gal",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Gram",
                Abbreviation = "gm",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Inch",
                Abbreviation = "in",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Liter",
                Abbreviation = "ltr",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Meter",
                Abbreviation = "m",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Pint",
                Abbreviation = "pt",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Pound",
                Abbreviation = "lb",
                IsConvertible = true,
                IsCustom = false
            },
            new UnitOfMeasure
            {
                Name = "Yard",
                Abbreviation = "yd",
                IsConvertible = true,
                IsCustom = false
            }
        };
    }
}