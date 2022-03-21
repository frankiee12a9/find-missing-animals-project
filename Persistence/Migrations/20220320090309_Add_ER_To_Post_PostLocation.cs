using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Add_ER_To_Post_PostLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PetLocation_PetLocationId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "PetLocation");

            migrationBuilder.RenameColumn(
                name: "PetLocationId",
                table: "Posts",
                newName: "PostLocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_PetLocationId",
                table: "Posts",
                newName: "IX_Posts_PostLocationId");

            migrationBuilder.CreateTable(
                name: "PostLocation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PostCode = table.Column<string>(type: "TEXT", nullable: true),
                    RoadLocation = table.Column<string>(type: "TEXT", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: false),
                    DetailedLocation = table.Column<string>(type: "TEXT", nullable: true),
                    ExtraLocation = table.Column<string>(type: "TEXT", nullable: true),
                    Longitude = table.Column<double>(type: "REAL", nullable: true),
                    Latitude = table.Column<double>(type: "REAL", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostLocation", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostLocation_PostLocationId",
                table: "Posts",
                column: "PostLocationId",
                principalTable: "PostLocation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostLocation_PostLocationId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "PostLocation");

            migrationBuilder.RenameColumn(
                name: "PostLocationId",
                table: "Posts",
                newName: "PetLocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_PostLocationId",
                table: "Posts",
                newName: "IX_Posts_PetLocationId");

            migrationBuilder.CreateTable(
                name: "PetLocation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DetailedLocation = table.Column<string>(type: "TEXT", nullable: true),
                    ExtraLocation = table.Column<string>(type: "TEXT", nullable: true),
                    Latitude = table.Column<double>(type: "REAL", nullable: true),
                    Location = table.Column<string>(type: "TEXT", nullable: false),
                    Longitude = table.Column<double>(type: "REAL", nullable: true),
                    PostCode = table.Column<string>(type: "TEXT", nullable: true),
                    RoadLocation = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetLocation", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PetLocation_PetLocationId",
                table: "Posts",
                column: "PetLocationId",
                principalTable: "PetLocation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
