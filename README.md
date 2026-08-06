# Degree Planner

Degree Planner is a tool for modeling UBC degree requirements and checking student progress toward graduation.

The project processes large-scale course data from the UBC Academic Calendar and models courses, prerequisites, corequisites, and program requirements to automatically determine completed and remaining degree requirements.

## Features

- Extract and process UBC course information from the UBC Academic Calendar
- Parse prerequisite and corequisite relationships into structured data
- Represent graduation and specialization requirements
- Check completed courses against degree requirements
- Track remaining requirements for a selected program

## Project Design

The project separates different parts of the degree planning logic:

- **Course Model**: Stores course information such as code, description, prerequisites, and corequisites
- **Requirement Model**: Represents graduation and specialization requirements
- **Check Module**: Determines whether completed courses satisfy specific requirements
- **Database Layer**: Stores structured course data in SQLite for efficient querying

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS

**Backend / Data Processing**
- TypeScript
- SQLite
- Data parsing and validation

## Data Source

Course data is collected from the UBC Vancouver Academic Calendar:

[UBC Vancouver Academic Calendar](https://vancouver.calendar.ubc.ca/course-descriptions/courses-subject)

The current dataset contains **9,489 UBC courses**, including course information, prerequisites, and corequisites.

## Development Progress

- Built a course data extraction pipeline from UBC Calendar
- Parsed prerequisite and corequisite relationships into structured data
- Designed models for courses and degree requirements
- Implemented requirement checking logic with automated tests
- Structured 9,489 courses into separate frontend and backend datasets to support efficient querying and validation

## Future Work

- Add a user interface for selecting completed courses and viewing degree progress
- Support more UBC programs and specializations
- Add semester planning features