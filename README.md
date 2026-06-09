# Japan & Thailand Family Travel Assistant 2026

A WhatsApp-based AI travel concierge for a family trip to Thailand and Japan. The assistant will manage flights, hotels, transportation, attractions, reservations, packing, budgets, daily itineraries, family reminders, weather alerts, local recommendations, and travel disruptions.

## Project Goals

- Provide proactive WhatsApp briefings and reminders
- Coordinate trip logistics for 4 travelers
- Track bookings, confirmations, schedules, and expenses
- Recommend reservations and tickets based on availability
- Offer weather forecasts, daily itineraries, and local advice in fluent Hebrew
- Maintain a memory of trip preferences and history

## Preferred Stack

- Claude API (AI intelligence)
- WhatsApp Business API (messaging interface)
- Supabase / PostgreSQL (data storage)
- n8n (automation workflows)
- Google Calendar (calendar sync)

## Project Structure

- `docs/` - architectural and workflow documentation
- `src/` - integration code, API handlers, automation scripts
- `schema/` - database schema and migration resources

## Environment Setup

1. Copy `.env.example` to `.env`
2. Configure `WHATSAPP_API_URL`, `WHATSAPP_API_TOKEN`, `WHATSAPP_VERIFY_TOKEN`, `CLAUDE_API_KEY`, `DATABASE_URL`, and `TRAVELER_WHATSAPP_NUMBER`
3. Install dependencies with `npm install`
4. Create the database schema with `npm run migrate`
5. Run the server locally with `npm run dev`

> `npm run migrate` applies all SQL migration files in `schema/`, including the default trip seed added in `schema/003_seed_trip_data.sql`.

## Available Endpoints

- `GET /webhook/whatsapp` - WhatsApp webhook verification endpoint
- `POST /webhook/whatsapp` - WhatsApp webhook receiver
- `POST /reminders/packing` - send a packing reminder test message and save it
- `POST /reminders/test` - send a generic test reminder message
- `POST /reminders/create` - create a persistent reminder in the database
- `POST /briefings/daily` - send a daily itinerary briefing message
- `GET /bookings/accommodations` - list accommodations
- `POST /bookings/accommodations` - add a new accommodation and schedule a check-in reminder
- `GET /bookings/flights` - list flights
- `POST /bookings/flights` - add a new flight and schedule a departure reminder
- `GET /bookings/attractions` - list attractions
- `POST /bookings/attractions` - add a new attraction and schedule a reservation reminder
- `POST /notifications/create` - add a new queued notification
- `GET /notifications/queued` - list notifications ready to send
- `POST /notifications/dispatch` - send queued notifications now
- `POST /scheduler/run` - schedule due reminders and dispatch queued notifications
- `POST /scheduler/daily` - create a scheduled daily briefing notification
- `GET /health` - service health check

## Next Steps

1. Review architecture and data model in `docs/ARCHITECTURE.md`
2. Define workflows in `docs/WORKFLOWS.md`
3. Build WhatsApp messaging and Claude integration
4. Create PostgreSQL schema and automation logic
5. Add Google Calendar sync and reminder engine
