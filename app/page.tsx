'use client';

import React, { useMemo, useState } from 'react';

// Define allowed objectives
export type Objective = 'Make CFP' | 'Top 12 Seed' | 'Win Conference';
export const OBJECTIVES: Objective[] = ['Make CFP', 'Top 12 Seed', 'Win Conference'];

// Safely load objective from localStorage
function getInitialObjective(): Objective {
  if (typeof localStorage === 'undefined') return 'Make CFP';
  try {
    const raw = localStorage.getItem('cfp.objective') || 'Make CFP';
    return (OBJECTIVES as readonly string[]).includes(raw) ? (raw as Objective) : 'Make CFP';
  } catch {
    return 'Make CFP';
  }
}

// Mock placeholder for computeGuide (replace with your rea
