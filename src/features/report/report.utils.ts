const WORK_START = 8;
const WORK_END = 17;

let holidaySet = new Set<string>();

// call this once after fetching holidays
export function setHolidays(holidays: string[]) {
	holidaySet = new Set(holidays);
}

function formatLocalDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function isWorkingDay(date: Date): boolean {
	return date.getDay() !== 0;
}

function nextDay(date: Date): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + 1);
	d.setHours(0, 0, 0, 0);
	return d;
}

function getWorkBounds(date: Date) {
	const start = new Date(date);
	start.setHours(WORK_START, 0, 0, 0);

	const end = new Date(date);
	end.setHours(WORK_END, 0, 0, 0);

	return { start, end };
}

export function workingSecondsDiff(start: Date, end: Date): number {
	if (end <= start) return 0;

	let totalSeconds = 0;
	let current = new Date(start);

	while (current < end) {
		const dayKey = formatLocalDate(current);

		if (isWorkingDay(current) && !holidaySet.has(dayKey)) {
			const { start: workStart, end: workEnd } = getWorkBounds(current);

			const rangeStart = new Date(
				Math.max(current.getTime(), workStart.getTime())
			);

			const rangeEnd = new Date(
				Math.min(end.getTime(), workEnd.getTime())
			);

			if (rangeEnd > rangeStart) {
				totalSeconds += Math.floor((rangeEnd.getTime() - rangeStart.getTime()) / 1000);
			}
		}
		current = nextDay(current);
	}
	return Math.max(0, totalSeconds);
}

export function getNetWorkingSeconds(start: Date, end: Date, onHoldSeconds: number): number {
	const working = workingSecondsDiff(start, end);
	return (Math.max(0, working - (onHoldSeconds || 0))) / (60 * 60);
}

export function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}