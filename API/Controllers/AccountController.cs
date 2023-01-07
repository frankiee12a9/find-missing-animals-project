using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[AllowAnonymous]
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : BaseApiController
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly TokenService _tokenService;

		public AccountController(UserManager<ApplicationUser> userManager,
			SignInManager<ApplicationUser> signInManager,
			TokenService tokenService)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_tokenService = tokenService;
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDTO>> Login([FromBody] LoginDTO loginDto)
		{
			var user = await _userManager.FindByEmailAsync(loginDto.Email);

			if (user == null)  return Unauthorized();

			var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

			if (result.Succeeded) return CreateUser(user);

			return Unauthorized();
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDTO>> Register([FromBody] RegisterDTO registerDto)
		{
			if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
			{
				ModelState.AddModelError("email", "Email already taken.");
				return ValidationProblem(ModelState);
			}

			if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
			{
				ModelState.AddModelError("username", "Username already taken.");
				return ValidationProblem(ModelState);
			}

			var user = new ApplicationUser
			{
				DisplayName = registerDto.DisplayName,
				Email = registerDto.Email,
				UserName = registerDto.UserName
			};

			var result = await _userManager.CreateAsync(user, registerDto.Password);

			if (result.Succeeded) return CreateUser(user);

			return BadRequest("Failed while registering user.");
		}

		[Authorize]
		[HttpGet]
		public async Task<ActionResult<UserDTO>> GetUser()
		{
			var user = await _userManager.Users
				.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
			return CreateUser(user);
		}

		private UserDTO CreateUser(ApplicationUser user)
		{
			return new UserDTO
			{
                Id = user.Id,
				DisplayName = user.DisplayName,
				Image = user.ProfilePictureUrl,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName
			};
		}
	}
}
