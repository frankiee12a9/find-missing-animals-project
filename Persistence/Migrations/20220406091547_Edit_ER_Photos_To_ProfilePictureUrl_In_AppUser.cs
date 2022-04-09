using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Edit_ER_Photos_To_ProfilePictureUrl_In_AppUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_ApplicationUserId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_ApplicationUserId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "IsProfilePicture",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePictureUrl",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePictureUrl",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsProfilePicture",
                table: "Photos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ApplicationUserId",
                table: "Photos",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_ApplicationUserId",
                table: "Photos",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
