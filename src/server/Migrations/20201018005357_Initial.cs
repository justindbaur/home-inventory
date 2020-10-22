using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeInventory.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UnitOfMeasures",
                columns: table => new
                {
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Abbreviation = table.Column<string>(nullable: true),
                    IsCustom = table.Column<bool>(nullable: false),
                    IsConvertible = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfMeasures", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    BarcodeNum = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: true),
                    Quantity = table.Column<double>(nullable: false),
                    Location = table.Column<string>(maxLength: 50, nullable: true),
                    Size = table.Column<double>(nullable: false),
                    UOMName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.BarcodeNum);
                    table.ForeignKey(
                        name: "FK_Items_UnitOfMeasures_UOMName",
                        column: x => x.UOMName,
                        principalTable: "UnitOfMeasures",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UnitOfMeasureConversions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FromUOMName = table.Column<string>(nullable: true),
                    ToUOMName = table.Column<string>(nullable: true),
                    Value = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfMeasureConversions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasureConversions_UnitOfMeasures_FromUOMName",
                        column: x => x.FromUOMName,
                        principalTable: "UnitOfMeasures",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasureConversions_UnitOfMeasures_ToUOMName",
                        column: x => x.ToUOMName,
                        principalTable: "UnitOfMeasures",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ItemInstances",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ItemBarcodeNum = table.Column<string>(nullable: true),
                    Quantity = table.Column<double>(nullable: false),
                    ExpireDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemInstances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemInstances_Items_ItemBarcodeNum",
                        column: x => x.ItemBarcodeNum,
                        principalTable: "Items",
                        principalColumn: "BarcodeNum",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Ounce", "oz", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Feet", "ft", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Gallon", "gal", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Gram", "gm", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Inch", "in", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Liter", "ltr", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Meter", "m", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Pint", "pt", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Pound", "lb", true, false });

            migrationBuilder.InsertData(
                table: "UnitOfMeasures",
                columns: new[] { "Name", "Abbreviation", "IsConvertible", "IsCustom" },
                values: new object[] { "Yard", "yd", true, false });

            migrationBuilder.CreateIndex(
                name: "IX_ItemInstances_ItemBarcodeNum",
                table: "ItemInstances",
                column: "ItemBarcodeNum");

            migrationBuilder.CreateIndex(
                name: "IX_Items_UOMName",
                table: "Items",
                column: "UOMName");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasureConversions_FromUOMName",
                table: "UnitOfMeasureConversions",
                column: "FromUOMName");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasureConversions_ToUOMName",
                table: "UnitOfMeasureConversions",
                column: "ToUOMName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemInstances");

            migrationBuilder.DropTable(
                name: "UnitOfMeasureConversions");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "UnitOfMeasures");
        }
    }
}
