-- Seed the default trip and travelers for the WhatsApp travel assistant

INSERT INTO trips (id, name, destination, start_date, end_date, notes)
VALUES (
  'c2720e6e-8d6c-4fcd-9b7f-3b31a34bfe88',
  'Japan & Thailand Family Travel 2026',
  'Thailand and Japan',
  '2026-06-25',
  '2026-08-31',
  'Koh Phangan עבור רגיעה ובית חוף, ואחר כך טיול משפחתי ביפן עם טבע, תרבות וחוויה ייחודית.'
);

INSERT INTO travelers (id, first_name, last_name, role, phone, preferences)
VALUES
  (gen_random_uuid(), 'Limor', 'Gurevich', 'adult', NULL, '{}'),
  (gen_random_uuid(), 'Daniel', 'Gurevich', 'adult', NULL, '{}'),
  (gen_random_uuid(), 'Beeri', 'Gurevich', 'child', NULL, '{}'),
  (gen_random_uuid(), 'Alex', 'Gurevich', 'child', NULL, '{}');
