using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Persistence.Migrations
{
    public partial class Initial_Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.CreateTable(
            //     name: "AspNetRoles",
            //     columns: table => new
            //     {
            //         Id = table.Column<string>(type: "text", nullable: false),
            //         Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
            //         NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
            //         ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_AspNetRoles", x => x.Id);
            //     });

        //     migrationBuilder.CreateTable(
        //         name: "AspNetUsers",
        //         columns: table => new
        //         {
        //             Id = table.Column<string>(type: "text", nullable: false),
        //             DisplayName = table.Column<string>(type: "text", nullable: true),
        //             Bio = table.Column<string>(type: "text", nullable: true),
        //             ProfilePictureUrl = table.Column<string>(type: "text", nullable: true),
        //             UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
        //             NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
        //             Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
        //             NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
        //             EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
        //             PasswordHash = table.Column<string>(type: "text", nullable: true),
        //             SecurityStamp = table.Column<string>(type: "text", nullable: true),
        //             ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
        //             PhoneNumber = table.Column<string>(type: "text", nullable: true),
        //             PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
        //             TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
        //             LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
        //             LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
        //             AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_AspNetUsers", x => x.Id);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "PostLocation",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             PostCode = table.Column<string>(type: "text", nullable: true),
        //             RoadLocation = table.Column<string>(type: "text", nullable: false),
        //             Location = table.Column<string>(type: "text", nullable: false),
        //             DetailedLocation = table.Column<string>(type: "text", nullable: true),
        //             ExtraLocation = table.Column<string>(type: "text", nullable: true),
        //             Longitude = table.Column<double>(type: "double precision", nullable: true),
        //             Latitude = table.Column<double>(type: "double precision", nullable: true)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_PostLocation", x => x.Id);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag1s",
        //         columns: table => new
        //         {
        //             Id = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag1s", x => x.Id);
        //             table.UniqueConstraint("AK_Tag1s_TagName", x => x.TagName);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag2s",
        //         columns: table => new
        //         {
        //             Id = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag2s", x => x.Id);
        //             table.UniqueConstraint("AK_Tag2s_TagName", x => x.TagName);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag3s",
        //         columns: table => new
        //         {
        //             Id = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag3s", x => x.Id);
        //             table.UniqueConstraint("AK_Tag3s_TagName", x => x.TagName);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag4s",
        //         columns: table => new
        //         {
        //             Id = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag4s", x => x.Id);
        //             table.UniqueConstraint("AK_Tag4s_TagName", x => x.TagName);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag5s",
        //         columns: table => new
        //         {
        //             Id = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag5s", x => x.Id);
        //             table.UniqueConstraint("AK_Tag5s_TagName", x => x.TagName);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "AspNetRoleClaims",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             RoleId = table.Column<string>(type: "text", nullable: false),
        //             ClaimType = table.Column<string>(type: "text", nullable: true),
        //             ClaimValue = table.Column<string>(type: "text", nullable: true)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
        //                 column: x => x.RoleId,
        //                 principalTable: "AspNetRoles",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "AspNetUserClaims",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             UserId = table.Column<string>(type: "text", nullable: false),
        //             ClaimType = table.Column<string>(type: "text", nullable: true),
        //             ClaimValue = table.Column<string>(type: "text", nullable: true)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_AspNetUserClaims_AspNetUsers_UserId",
        //                 column: x => x.UserId,
        //                 principalTable: "AspNetUsers",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "AspNetUserLogins",
        //         columns: table => new
        //         {
        //             LoginProvider = table.Column<string>(type: "text", nullable: false),
        //             ProviderKey = table.Column<string>(type: "text", nullable: false),
        //             ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
        //             UserId = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
        //             table.ForeignKey(
        //                 name: "FK_AspNetUserLogins_AspNetUsers_UserId",
        //                 column: x => x.UserId,
        //                 principalTable: "AspNetUsers",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "AspNetUserRoles",
        //         columns: table => new
        //         {
        //             UserId = table.Column<string>(type: "text", nullable: false),
        //             RoleId = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
        //             table.ForeignKey(
        //                 name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
        //                 column: x => x.RoleId,
        //                 principalTable: "AspNetRoles",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_AspNetUserRoles_AspNetUsers_UserId",
        //                 column: x => x.UserId,
        //                 principalTable: "AspNetUsers",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "AspNetUserTokens",
        //         columns: table => new
        //         {
        //             UserId = table.Column<string>(type: "text", nullable: false),
        //             LoginProvider = table.Column<string>(type: "text", nullable: false),
        //             Name = table.Column<string>(type: "text", nullable: false),
        //             Value = table.Column<string>(type: "text", nullable: true)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
        //             table.ForeignKey(
        //                 name: "FK_AspNetUserTokens_AspNetUsers_UserId",
        //                 column: x => x.UserId,
        //                 principalTable: "AspNetUsers",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Posts",
        //         columns: table => new
        //         {
        //             Id = table.Column<Guid>(type: "uuid", nullable: false),
        //             Title = table.Column<string>(type: "text", nullable: false),
        //             Content = table.Column<string>(type: "text", nullable: false),
        //             Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
        //             IsFound = table.Column<bool>(type: "boolean", nullable: false),
        //             PostLocationId = table.Column<int>(type: "integer", nullable: true)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Posts", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_Posts_PostLocation_PostLocationId",
        //                 column: x => x.PostLocationId,
        //                 principalTable: "PostLocation",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Restrict);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Comments",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             Text = table.Column<string>(type: "text", nullable: true),
        //             ApplicationUserId = table.Column<string>(type: "text", nullable: true),
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             Timestamp = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Comments", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_Comments_AspNetUsers_ApplicationUserId",
        //                 column: x => x.ApplicationUserId,
        //                 principalTable: "AspNetUsers",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Restrict);
        //             table.ForeignKey(
        //                 name: "FK_Comments_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Photos",
        //         columns: table => new
        //         {
        //             Id = table.Column<string>(type: "text", nullable: false),
        //             Url = table.Column<string>(type: "text", nullable: true),
        //             PostId = table.Column<Guid>(type: "uuid", nullable: true)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Photos", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_Photos_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Restrict);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "PostFollowers",
        //         columns: table => new
        //         {
        //             ApplicationUserId = table.Column<string>(type: "text", nullable: false),
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             isPoster = table.Column<bool>(type: "boolean", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_PostFollowers", x => new { x.PostId, x.ApplicationUserId });
        //             table.ForeignKey(
        //                 name: "FK_PostFollowers_AspNetUsers_ApplicationUserId",
        //                 column: x => x.ApplicationUserId,
        //                 principalTable: "AspNetUsers",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_PostFollowers_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag1Posts",
        //         columns: table => new
        //         {
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag1Posts", x => new { x.PostId, x.TagName });
        //             table.ForeignKey(
        //                 name: "FK_Tag1Posts_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Tag1Posts_Tag1s_TagName",
        //                 column: x => x.TagName,
        //                 principalTable: "Tag1s",
        //                 principalColumn: "TagName",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag2Posts",
        //         columns: table => new
        //         {
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag2Posts", x => new { x.PostId, x.TagName });
        //             table.ForeignKey(
        //                 name: "FK_Tag2Posts_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Tag2Posts_Tag2s_TagName",
        //                 column: x => x.TagName,
        //                 principalTable: "Tag2s",
        //                 principalColumn: "TagName",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag3Posts",
        //         columns: table => new
        //         {
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag3Posts", x => new { x.PostId, x.TagName });
        //             table.ForeignKey(
        //                 name: "FK_Tag3Posts_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Tag3Posts_Tag3s_TagName",
        //                 column: x => x.TagName,
        //                 principalTable: "Tag3s",
        //                 principalColumn: "TagName",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag4Posts",
        //         columns: table => new
        //         {
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag4Posts", x => new { x.PostId, x.TagName });
        //             table.ForeignKey(
        //                 name: "FK_Tag4Posts_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Tag4Posts_Tag4s_TagName",
        //                 column: x => x.TagName,
        //                 principalTable: "Tag4s",
        //                 principalColumn: "TagName",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateTable(
        //         name: "Tag5Posts",
        //         columns: table => new
        //         {
        //             PostId = table.Column<Guid>(type: "uuid", nullable: false),
        //             TagName = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Tag5Posts", x => new { x.PostId, x.TagName });
        //             table.ForeignKey(
        //                 name: "FK_Tag5Posts_Posts_PostId",
        //                 column: x => x.PostId,
        //                 principalTable: "Posts",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Tag5Posts_Tag5s_TagName",
        //                 column: x => x.TagName,
        //                 principalTable: "Tag5s",
        //                 principalColumn: "TagName",
        //                 onDelete: ReferentialAction.Cascade);
        //         });

        //     migrationBuilder.CreateIndex(
        //         name: "IX_AspNetRoleClaims_RoleId",
        //         table: "AspNetRoleClaims",
        //         column: "RoleId");

        //     migrationBuilder.CreateIndex(
        //         name: "RoleNameIndex",
        //         table: "AspNetRoles",
        //         column: "NormalizedName",
        //         unique: true);

        //     migrationBuilder.CreateIndex(
        //         name: "IX_AspNetUserClaims_UserId",
        //         table: "AspNetUserClaims",
        //         column: "UserId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_AspNetUserLogins_UserId",
        //         table: "AspNetUserLogins",
        //         column: "UserId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_AspNetUserRoles_RoleId",
        //         table: "AspNetUserRoles",
        //         column: "RoleId");

        //     migrationBuilder.CreateIndex(
        //         name: "EmailIndex",
        //         table: "AspNetUsers",
        //         column: "NormalizedEmail");

        //     migrationBuilder.CreateIndex(
        //         name: "UserNameIndex",
        //         table: "AspNetUsers",
        //         column: "NormalizedUserName",
        //         unique: true);

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Comments_ApplicationUserId",
        //         table: "Comments",
        //         column: "ApplicationUserId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Comments_PostId",
        //         table: "Comments",
        //         column: "PostId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Photos_PostId",
        //         table: "Photos",
        //         column: "PostId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_PostFollowers_ApplicationUserId",
        //         table: "PostFollowers",
        //         column: "ApplicationUserId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Posts_PostLocationId",
        //         table: "Posts",
        //         column: "PostLocationId");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Tag1Posts_TagName",
        //         table: "Tag1Posts",
        //         column: "TagName");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Tag2Posts_TagName",
        //         table: "Tag2Posts",
        //         column: "TagName");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Tag3Posts_TagName",
        //         table: "Tag3Posts",
        //         column: "TagName");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Tag4Posts_TagName",
        //         table: "Tag4Posts",
        //         column: "TagName");

        //     migrationBuilder.CreateIndex(
        //         name: "IX_Tag5Posts_TagName",
        //         table: "Tag5Posts",
        //         column: "TagName");
        // }

        // protected override void Down(MigrationBuilder migrationBuilder)
        // {
        //     migrationBuilder.DropTable(
        //         name: "AspNetRoleClaims");

        //     migrationBuilder.DropTable(
        //         name: "AspNetUserClaims");

        //     migrationBuilder.DropTable(
        //         name: "AspNetUserLogins");

        //     migrationBuilder.DropTable(
        //         name: "AspNetUserRoles");

        //     migrationBuilder.DropTable(
        //         name: "AspNetUserTokens");

        //     migrationBuilder.DropTable(
        //         name: "Comments");

        //     migrationBuilder.DropTable(
        //         name: "Photos");

        //     migrationBuilder.DropTable(
        //         name: "PostFollowers");

        //     migrationBuilder.DropTable(
        //         name: "Tag1Posts");

        //     migrationBuilder.DropTable(
        //         name: "Tag2Posts");

        //     migrationBuilder.DropTable(
        //         name: "Tag3Posts");

        //     migrationBuilder.DropTable(
        //         name: "Tag4Posts");

        //     migrationBuilder.DropTable(
        //         name: "Tag5Posts");

        //     migrationBuilder.DropTable(
        //         name: "AspNetRoles");

        //     migrationBuilder.DropTable(
        //         name: "AspNetUsers");

        //     migrationBuilder.DropTable(
        //         name: "Tag1s");

        //     migrationBuilder.DropTable(
        //         name: "Tag2s");

        //     migrationBuilder.DropTable(
        //         name: "Tag3s");

        //     migrationBuilder.DropTable(
        //         name: "Tag4s");

        //     migrationBuilder.DropTable(
        //         name: "Posts");

        //     migrationBuilder.DropTable(
        //         name: "Tag5s");

        //     migrationBuilder.DropTable(
        //         name: "PostLocation");
        }
    }
}
