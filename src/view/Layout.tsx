import Game from "./Game";
import Dice from "./components/Dice";
import { useEffect, useState } from "react";
import { createImageURL } from "../utils/createImageURL";
import { colors } from "../utils/diceColors";
import { Container, Grid, Paper, Stack, useTheme } from "@mui/material";
import { ModeSwitcher } from "./components/ColorMode";

const Layout = () => {
  const theme = useTheme();
  const [images, setImages] = useState<string[]>([]);

  function generateFaces() {
    setImages([]);
    colors.forEach((c) => {
      const imageUrl: string = createImageURL(200, 200, c);
      setImages((pi) => pi.concat(imageUrl));
    });
  }
  useEffect(() => {
    generateFaces();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        background: theme.palette.background.default,
      }}
    >
      <Stack>
        <Grid container>
          <Grid item xs={12}>
            <ModeSwitcher />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={2}>
              <Game />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center">
              <Dice size={100} faces={images} />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Layout;
