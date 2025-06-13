import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  const host = request.headers.get('host') || '';
  
  const domain = host.split('.').length > 2
    ? '.' + host.split('.').slice(-2).join('.')
    : '.' + host;

  const response = NextResponse.json({ message: `login to ${domain} successful` });

  const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImd0eSI6WyJhdXRob3JpemF0aW9uX2NvZGUiXSwia2lkIjoidnBmNUt1ME4yVkhDZHBWVnBERGxPVGR3M2ZJIn0.eyJhdWQiOiI3Yzc4YWFhYi0zY2NmLTQzZTEtYTQxYy04MDAzMzM5MDliODEiLCJleHAiOjE3NDk4Mjg0ODMsImlhdCI6MTc0OTgyNDg4MywiaXNzIjoiaHR0cHM6Ly9hdXRoLXRlc3Qtbngtb3JkZXJzaXRlLXVzLmxpdHRsZWNhZXNhcnMuY29tLyIsInN1YiI6IjhjYjVkZjFhLTkxNzItNDFhNC1iNjQwLWY4M2M5NGViMTQwNCIsImp0aSI6ImVlY2I3YjdjLWZiODAtNDI4Ni1hNTljLThjYmM3MTQ4OGNiMCIsImF1dGhlbnRpY2F0aW9uVHlwZSI6IlBBU1NXT1JEIiwiYXBwbGljYXRpb25JZCI6IjdjNzhhYWFiLTNjY2YtNDNlMS1hNDFjLTgwMDMzMzkwOWI4MSIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUgb2ZmbGluZV9hY2Nlc3MiLCJyb2xlcyI6W10sInNpZCI6ImJjNTY0ODkzLTc3ZTItNGFlZS1hM2Q3LTlmMzEyNDIyMWU5NSIsImF1dGhfdGltZSI6MTc0OTgyNDg4MywidGlkIjoiODYxMGFlYmUtZDZhZi00NDUxLThjMmUtOTU1NDgwYmJmNjNjIn0.i0y3hB6gJNn9J-vp1qKDznH6hYZhsavo9PQtbyx-GoiqzHdgjGYF8iPJlB0at9IubY0WrVHEK9cRzNVxX5TaSfdX08-yyuBDYk-6QXVwtjxufjys_1LgXKxw1lgTpigSbEhwXF8_FOggSig85IOXSBfdrE92zOq2Q8T9fVhi81FptHQbUMbt1-vt_iiIWEjsMCc0lpUdLHv5c9nWf_mjXFZY95nO-GIbfemTDOvh69E0M-ek9Bv5x0vGpFdvmTueKzSJ7eNi0ud7-UZJmvdXKDBxwPBNye48QvF9mcG-GXXrsd1pS5bGgyspb2Q-W03O_6ebu_YgMHJS5Dn5cRtP-Q'
  
  response.cookies.set('auth_token', jwt, {
    domain,
    path: '/',
    expires: expires,
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  });

  return response;
}