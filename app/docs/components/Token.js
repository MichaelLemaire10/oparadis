module.exports = {
	Token: {
		type: "object",
		required: ["access_token", "refresh_token"],
		properties: {
			access_token: {
				type: "string",
				description: "Authentication: access_token",
				required: true,
				example:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzAzMDcyMSwiZXhwIjoxNjQzMDMwNzUxfQ.-_F14vPYc5mXDPNgpYiwsVo_LeaZTEw93zc05goBIiw",
			},
			refresh_token: {
				type: "string",
				description: "Authentication: refresh_token",
				required: true,
				example:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzEwMDYxMCwiZXhwIjoxNjQzMTA0MjEwfQ.5aU00qsTYoZaHwPWRaAytj36PfxqBNsYMPSugxxaCZw",
			},
		},
		example: {
			access_token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzAzMDcyMSwiZXhwIjoxNjQzMDMwNzUxfQ.-_F14vPYc5mXDPNgpYiwsVo_LeaZTEw93zc05goBIiw",
			refresh_token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxMDEsImlhdCI6MTY0MzEwMDYxMCwiZXhwIjoxNjQzMTA0MjEwfQ.5aU00qsTYoZaHwPWRaAytj36PfxqBNsYMPSugxxaCZw",
		},
	},
};
