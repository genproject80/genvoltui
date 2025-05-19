import { AppBar, Toolbar, Typography } from "@mui/material";

function Header({ user }) {
  return (
    <AppBar position="fixed" sx={{ width: "100vw", zIndex: 1000 }}>
      <Toolbar>
        <Typography variant="h6">GenVolt Systems</Typography>
        <Typography sx={{ marginLeft: "auto" }}>Welcome {user.firstName} {user.lastName}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
