import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { Air, Opacity, Thermostat, Tv, WbIncandescent } from "@mui/icons-material";
// components
import Iconify from '../components/iconify';
import StatBox from '../components/StatBox/StatBox';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppFormInput,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function SensorManage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 29"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 28"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 29"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 28"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 29"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 29"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 24"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatBox title="Light: 24"
            subtitle="Active for 3 hours"
            progress="50"
            increase="5Kwh"
            icon={
              <WbIncandescent
                 sx={{ color: 'blue', fontSize: "26px" }}
              />
            }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
