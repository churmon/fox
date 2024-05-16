/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
import { hostname } from "os";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav:true,
    aggressiveFrontEndNavCaching:true,
    reloadOnOnline:true,
    disable:false,
    workboxOptions:{
        disableDevLogs:true,
    },
  });
// https://vwluzevqbgdoxiypuoag.supabase.co/storage/v1/object/public/files/vehicleInspection/Screenshot_20240508-104019.png_1715816431905?t=2024-05-16T03%3A59%3A14.179Z
const nextConfig = {
  images:{
    remotePatterns:
    [
      {
      protocol:'https',
      hostname: 'vwluzevqbgdoxiypuoag.supabase.co'
    },
  ],
  }
};

export default withPWA(nextConfig);
