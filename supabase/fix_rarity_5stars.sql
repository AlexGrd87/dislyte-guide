-- Correction rarity → 5 étoiles
-- Espers : Feng Xun, Yorana, Yukine, Victor, Tetsuya

UPDATE espers SET rarity = 5 WHERE id IN ('feng-xun', 'yorana', 'yukine', 'victor', 'tetsuya');
