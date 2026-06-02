// Counter-picks : { esperId: { counters: [ids...], counteredBy: [ids...] } }
// "counters" = cet esper est fort CONTRE ces ennemis/espers
// "counteredBy" = cet esper EST contré par ceux-ci

export const COUNTER_DATA = {
  // ── Contrôleurs de PA ──────────────────────────────────────────
  'unas':        { counters: ['wu-you', 'berenice', 'gabrielle'], counteredBy: ['raven', 'sienna', 'jin-hee'] },
  'wu-you':      { counters: ['unas', 'berenice', 'long-mian'],   counteredBy: ['sienna', 'jin-hee', 'raven'] },
  'long-mian':   { counters: ['unas', 'wu-you', 'sander'],        counteredBy: ['sienna', 'narmer', 'raven'] },
  'berenice':    { counters: ['unas', 'gabrielle', 'ahmed'],      counteredBy: ['raven', 'narmer', 'sienna'] },

  // ── Dissipateurs / Anti-buff ───────────────────────────────────
  'raven':       { counters: ['gabrielle', 'berenice', 'sally', 'lu-yi'], counteredBy: ['unas', 'wu-you', 'narmer'] },
  'narmer':      { counters: ['gabrielle', 'berenice', 'long-mian', 'lu-yi'], counteredBy: ['unas', 'wu-you'] },
  'sienna':      { counters: ['unas', 'wu-you', 'long-mian'],     counteredBy: ['narmer', 'raven'] },
  'jin-hee':     { counters: ['unas', 'wu-you', 'berenice'],      counteredBy: ['narmer', 'raven'] },

  // ── DPS meta ──────────────────────────────────────────────────
  'gaius':       { counters: ['tank-espers', 'kronosteam'],        counteredBy: ['raven', 'narmer', 'sienna'] },
  'meta-li-ling':{ counters: ['unas', 'berenice', 'long-mian'],   counteredBy: ['sienna', 'jin-hee', 'raven'] },
  'lin-xiao':    { counters: ['apep-team', 'fafnir-team'],         counteredBy: ['raven', 'narmer'] },
  'tang-yun':    { counters: ['fafnir-team', 'shield-espers'],     counteredBy: ['raven', 'narmer'] },
  'abigail':     { counters: ['fafnir-team', 'shield-espers'],     counteredBy: ['sienna', 'raven'] },
  'arthur':      { counters: ['kronosteam', 'apep-team'],          counteredBy: ['raven', 'narmer', 'sienna'] },
  'sander':      { counters: ['kronosteam', 'apep-team'],          counteredBy: ['raven', 'sienna'] },

  // ── Supports / Healers ────────────────────────────────────────
  'gabrielle':   { counters: ['dps-espers', 'team-fight'],         counteredBy: ['raven', 'narmer'] },
  'ahmed':       { counters: ['kronosteam', 'fafnir-team'],        counteredBy: ['raven', 'narmer'] },
  'lu-yi':       { counters: ['apep-team', 'fafnir-team'],         counteredBy: ['raven', 'narmer'] },
  'pindar':      { counters: ['dps-espers', 'team-fight'],         counteredBy: ['raven', 'narmer'] },
  'lu-shang':    { counters: ['dps-espers', 'pvp-attack'],         counteredBy: ['raven', 'narmer'] },
  'sally':       { counters: ['attrition-teams'],                  counteredBy: ['raven', 'narmer', 'sienna'] },
  'asnath':      { counters: ['attrition-teams'],                  counteredBy: ['raven', 'narmer'] },
  'dhalia':      { counters: ['attrition-teams'],                  counteredBy: ['raven', 'narmer'] },

  // ── Debuffeurs ────────────────────────────────────────────────
  'hyde':        { counters: ['kronosteam', 'apep-team', 'tank-espers'], counteredBy: ['sienna', 'lu-yi'] },
  'ollie':       { counters: ['apep-team', 'fafnir-team'],         counteredBy: ['sienna', 'lu-yi'] },
  'clara':       { counters: ['pvp-defense', 'dps-espers'],        counteredBy: ['raven', 'narmer'] },
}

// Map lisible pour affichage dans l'UI
export const COUNTER_LABELS = {
  'tank-espers':     'Espers Tank',
  'dps-espers':      'DPS ennemis',
  'shield-espers':   'Boucliers',
  'pvp-attack':      'Attaque PvP',
  'pvp-defense':     'Défense PvP',
  'team-fight':      'Fight d\'équipe',
  'attrition-teams': 'Équipes d\'usure',
  'kronosteam':      'Kronos',
  'apep-team':       'Apep',
  'fafnir-team':     'Fafnir',
}
