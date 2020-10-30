using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeInventory.Server.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parts",
                columns: table => new
                {
                    Company = table.Column<string>(type: "TEXT", nullable: false),
                    Id = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    TypeCode = table.Column<string>(type: "TEXT", maxLength: 2, nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parts", x => new { x.Company, x.Id });
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Company = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => new { x.Company, x.UserName });
                });

            migrationBuilder.CreateTable(
                name: "PartTrans",
                columns: table => new
                {
                    Company = table.Column<string>(type: "TEXT", nullable: false),
                    TranId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PartId = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    TranDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EntryUserName = table.Column<string>(type: "TEXT", maxLength: 20, nullable: true),
                    Adjustment = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PartTrans", x => new { x.Company, x.TranId });
                    table.ForeignKey(
                        name: "FK_PartTrans_Parts_Company_PartId",
                        columns: x => new { x.Company, x.PartId },
                        principalTable: "Parts",
                        principalColumns: new[] { "Company", "Id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PartTrans_Users_Company_EntryUserName",
                        columns: x => new { x.Company, x.EntryUserName },
                        principalTable: "Users",
                        principalColumns: new[] { "Company", "UserName" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Company", "UserName" },
                values: new object[] { "HOME", "jdbaur" });

            migrationBuilder.CreateIndex(
                name: "IX_PartTrans_Company_EntryUserName",
                table: "PartTrans",
                columns: new[] { "Company", "EntryUserName" });

            migrationBuilder.CreateIndex(
                name: "IX_PartTrans_Company_PartId",
                table: "PartTrans",
                columns: new[] { "Company", "PartId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PartTrans");

            migrationBuilder.DropTable(
                name: "Parts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
