using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class New_Tag_Post_ER : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tag1Posts_Tag1s_Tag1Id",
                table: "Tag1Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag2Posts_Tag2s_Tag2Id",
                table: "Tag2Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag3Posts_Tag3s_Tag3Id",
                table: "Tag3Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag4Posts_Tag4s_Tag4Id",
                table: "Tag4Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag5Posts_Tag5s_Tag5Id",
                table: "Tag5Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag5Posts",
                table: "Tag5Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag5Posts_Tag5Id",
                table: "Tag5Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag4Posts",
                table: "Tag4Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag4Posts_Tag4Id",
                table: "Tag4Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag3Posts",
                table: "Tag3Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag3Posts_Tag3Id",
                table: "Tag3Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag2Posts",
                table: "Tag2Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag2Posts_Tag2Id",
                table: "Tag2Posts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag1Posts",
                table: "Tag1Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag1Posts_Tag1Id",
                table: "Tag1Posts");

            migrationBuilder.DropColumn(
                name: "Tag5Id",
                table: "Tag5Posts");

            migrationBuilder.DropColumn(
                name: "Tag4Id",
                table: "Tag4Posts");

            migrationBuilder.DropColumn(
                name: "Tag3Id",
                table: "Tag3Posts");

            migrationBuilder.DropColumn(
                name: "Tag2Id",
                table: "Tag2Posts");

            migrationBuilder.DropColumn(
                name: "Tag1Id",
                table: "Tag1Posts");

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag5s",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagName",
                table: "Tag5Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag4s",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagName",
                table: "Tag4Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag3s",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagName",
                table: "Tag3Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag2s",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagName",
                table: "Tag2Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag1s",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TagName",
                table: "Tag1Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tag5s_TagName",
                table: "Tag5s",
                column: "TagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag5Posts",
                table: "Tag5Posts",
                columns: new[] { "PostId", "TagName" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tag4s_TagName",
                table: "Tag4s",
                column: "TagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag4Posts",
                table: "Tag4Posts",
                columns: new[] { "PostId", "TagName" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tag3s_TagName",
                table: "Tag3s",
                column: "TagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag3Posts",
                table: "Tag3Posts",
                columns: new[] { "PostId", "TagName" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tag2s_TagName",
                table: "Tag2s",
                column: "TagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag2Posts",
                table: "Tag2Posts",
                columns: new[] { "PostId", "TagName" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Tag1s_TagName",
                table: "Tag1s",
                column: "TagName");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag1Posts",
                table: "Tag1Posts",
                columns: new[] { "PostId", "TagName" });

            migrationBuilder.CreateIndex(
                name: "IX_Tag5Posts_TagName",
                table: "Tag5Posts",
                column: "TagName");

            migrationBuilder.CreateIndex(
                name: "IX_Tag4Posts_TagName",
                table: "Tag4Posts",
                column: "TagName");

            migrationBuilder.CreateIndex(
                name: "IX_Tag3Posts_TagName",
                table: "Tag3Posts",
                column: "TagName");

            migrationBuilder.CreateIndex(
                name: "IX_Tag2Posts_TagName",
                table: "Tag2Posts",
                column: "TagName");

            migrationBuilder.CreateIndex(
                name: "IX_Tag1Posts_TagName",
                table: "Tag1Posts",
                column: "TagName");

            migrationBuilder.AddForeignKey(
                name: "FK_Tag1Posts_Tag1s_TagName",
                table: "Tag1Posts",
                column: "TagName",
                principalTable: "Tag1s",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag2Posts_Tag2s_TagName",
                table: "Tag2Posts",
                column: "TagName",
                principalTable: "Tag2s",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag3Posts_Tag3s_TagName",
                table: "Tag3Posts",
                column: "TagName",
                principalTable: "Tag3s",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag4Posts_Tag4s_TagName",
                table: "Tag4Posts",
                column: "TagName",
                principalTable: "Tag4s",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag5Posts_Tag5s_TagName",
                table: "Tag5Posts",
                column: "TagName",
                principalTable: "Tag5s",
                principalColumn: "TagName",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tag1Posts_Tag1s_TagName",
                table: "Tag1Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag2Posts_Tag2s_TagName",
                table: "Tag2Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag3Posts_Tag3s_TagName",
                table: "Tag3Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag4Posts_Tag4s_TagName",
                table: "Tag4Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Tag5Posts_Tag5s_TagName",
                table: "Tag5Posts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tag5s_TagName",
                table: "Tag5s");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag5Posts",
                table: "Tag5Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag5Posts_TagName",
                table: "Tag5Posts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tag4s_TagName",
                table: "Tag4s");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag4Posts",
                table: "Tag4Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag4Posts_TagName",
                table: "Tag4Posts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tag3s_TagName",
                table: "Tag3s");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag3Posts",
                table: "Tag3Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag3Posts_TagName",
                table: "Tag3Posts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tag2s_TagName",
                table: "Tag2s");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag2Posts",
                table: "Tag2Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag2Posts_TagName",
                table: "Tag2Posts");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Tag1s_TagName",
                table: "Tag1s");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag1Posts",
                table: "Tag1Posts");

            migrationBuilder.DropIndex(
                name: "IX_Tag1Posts_TagName",
                table: "Tag1Posts");

            migrationBuilder.DropColumn(
                name: "TagName",
                table: "Tag5Posts");

            migrationBuilder.DropColumn(
                name: "TagName",
                table: "Tag4Posts");

            migrationBuilder.DropColumn(
                name: "TagName",
                table: "Tag3Posts");

            migrationBuilder.DropColumn(
                name: "TagName",
                table: "Tag2Posts");

            migrationBuilder.DropColumn(
                name: "TagName",
                table: "Tag1Posts");

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag5s",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "Tag5Id",
                table: "Tag5Posts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag4s",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "Tag4Id",
                table: "Tag4Posts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag3s",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "Tag3Id",
                table: "Tag3Posts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag2s",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "Tag2Id",
                table: "Tag2Posts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "TagName",
                table: "Tag1s",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<Guid>(
                name: "Tag1Id",
                table: "Tag1Posts",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag5Posts",
                table: "Tag5Posts",
                columns: new[] { "PostId", "Tag5Id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag4Posts",
                table: "Tag4Posts",
                columns: new[] { "PostId", "Tag4Id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag3Posts",
                table: "Tag3Posts",
                columns: new[] { "PostId", "Tag3Id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag2Posts",
                table: "Tag2Posts",
                columns: new[] { "PostId", "Tag2Id" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag1Posts",
                table: "Tag1Posts",
                columns: new[] { "PostId", "Tag1Id" });

            migrationBuilder.CreateIndex(
                name: "IX_Tag5Posts_Tag5Id",
                table: "Tag5Posts",
                column: "Tag5Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tag4Posts_Tag4Id",
                table: "Tag4Posts",
                column: "Tag4Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tag3Posts_Tag3Id",
                table: "Tag3Posts",
                column: "Tag3Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tag2Posts_Tag2Id",
                table: "Tag2Posts",
                column: "Tag2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tag1Posts_Tag1Id",
                table: "Tag1Posts",
                column: "Tag1Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tag1Posts_Tag1s_Tag1Id",
                table: "Tag1Posts",
                column: "Tag1Id",
                principalTable: "Tag1s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag2Posts_Tag2s_Tag2Id",
                table: "Tag2Posts",
                column: "Tag2Id",
                principalTable: "Tag2s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag3Posts_Tag3s_Tag3Id",
                table: "Tag3Posts",
                column: "Tag3Id",
                principalTable: "Tag3s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag4Posts_Tag4s_Tag4Id",
                table: "Tag4Posts",
                column: "Tag4Id",
                principalTable: "Tag4s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tag5Posts_Tag5s_Tag5Id",
                table: "Tag5Posts",
                column: "Tag5Id",
                principalTable: "Tag5s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
