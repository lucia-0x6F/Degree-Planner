# Degree Planner

Degree Planner is a tool for planning UBC degrees by organizing course information and checking graduation requirements.

The project parses course data from the UBC Academic Calendar and models courses, prerequisites, and program requirements to help students understand which requirements they have completed and what remains.

## Features

- Store and query UBC course information
- Parse prerequisite and corequisite relationships
- Represent graduation and specialization requirements
- Check completed courses against degree requirements
- Track remaining requirements for a selected program

## Project Design

The project separates different parts of the degree planning logic:

- **Course Model**: Stores course information such as code, description, prerequisites, and corequisites
- **Requirement Model**: Represents graduation and specialization requirements
- **Check Module**: Determines whether completed courses satisfy specific requirements
- **Database Layer**: Stores processed course data for querying

## Tech Stack

- TypeScript
- React + Vite
- SQLite
- Tailwind CSS

## Data Source

Course data is collected from the UBC Vancouver Academic Calendar:

https://vancouver.calendar.ubc.ca/course-descriptions/courses-subject

The current dataset contains **9,489 UBC courses**, including course information, prerequisites, and corequisites.

## Development Progress

- Built a course data extraction pipeline from UBC Calendar
- Parsed prerequisite and corequisite relationships into structured data
- Designed models for courses and degree requirements
- Implemented requirement checking logic with automated tests

## Future Work

- Add a user interface for selecting completed courses and viewing degree progress
- Support more UBC programs and specializations
- Add semester planning features