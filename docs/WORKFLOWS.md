# Workflows and Automation

## Workflow Categories

1. Daily Briefing Workflow
2. Reminder Workflow
3. Booking Monitoring Workflow
4. Weather Alert Workflow
5. Availability & Recommendation Workflow
6. Expense Tracking Workflow
7. Calendar Sync Workflow

## 1. Daily Briefing Workflow

Trigger:
- every day at 06:30 local time

Actions:
- Load current itinerary for the day
- Retrieve check-in/out, transport, reservations, and weather
- Summarize key events and alerts
- Use Claude to format a WhatsApp briefing
- Send message to family WhatsApp group or primary contact

Example briefing:
"Good morning Limor. Today you check out of Art Hotel Morioka at 11:00. Your train to Sendai departs at 13:14. Estimated transfer time to Morioka Station: 12 minutes. Weather in Sendai: 27°C, mostly sunny."

## 2. Reminder Workflow

Trigger:
- scheduled reminder time relative to event
- event update or new booking

Actions:
- identify upcoming departure, check-in, train, flight, attraction, or reservation
- compute travel time and buffer
- generate WhatsApp reminder
- optionally create/update Google Calendar event

Reminder types:
- airport departure
- train departure
- hotel check-in/out
- attraction entry
- packing reminder before travel day
- reservation lead time

## 3. Booking Monitoring Workflow

Trigger:
- new booking record created
- booking status change

Actions:
- validate confirmation numbers and travel windows
- schedule itinerary segments and reminders
- send confirmation summary via WhatsApp
- link to related calendar event

## 4. Weather Alert Workflow

Trigger:
- daily forecast update
- severe weather or travel disruption conditions

Actions:
- pull forecast for current and next destination
- compare against thresholds for rain, heat, typhoon, or storm
- recommend packing or plan changes
- send alert message

## 5. Availability & Recommendation Workflow

Trigger:
- periodic inventory check for must-do experiences
- new reservation window opening

Actions:
- monitor ticket availability for Universal Studios, cafes, festivals, etc.
- check train seat reservation windows for Shinkansen and regional routes
- detect sold-out or limited availability
- proactively message recommendations and booking urgency

## 6. Expense Tracking Workflow

Trigger:
- new expense entry
- weekly summary schedule

Actions:
- categorize travel costs (flights, lodging, transport, food, activities)
- update budget tracking dashboard
- send budget snapshot via WhatsApp
- flag overspend or budget gaps

## Automation Engine

Use n8n or similar orchestration to implement:
- hourly / daily triggers
- webhook listeners
- scheduled jobs for health checks and reminders
- integration steps for WhatsApp, Claude, weather, calendar, and database

For production, put logic into backend functions and use n8n for orchestration only.
