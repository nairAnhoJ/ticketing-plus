import { useState, useCallback, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useParams } from "react-router-dom";
import config from "../../config/config";

// ── Types ────────────────────────────────────────────────────────────────────
interface CheckboxItem {
  label: string;
  checked: boolean;
}

interface FormState {
  ticketNo: string;
  date: string;
  name: string;
  timeIn: string;
  timeOut: string;
  requestBy: string;
  requestReceived: string;
  problemReported: string;
  causeOfProblem: string;
  actionTaken: string;
  comments: string;
}

interface CheckboxGroups {
  hardware: CheckboxItem[];
  software: CheckboxItem[];
  network: CheckboxItem[];
  printer: CheckboxItem[];
  cctv: CheckboxItem[];
  devices: CheckboxItem[];
  warranty: CheckboxItem[];
}

interface Ticket {
  id: number;
  ticket_number: string;
  requester: string;
  description: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const toItems = (labels: string[]): CheckboxItem[] =>
  labels.map((label) => ({ label, checked: false }));

const INITIAL_CHECKBOXES: CheckboxGroups = {
  hardware: toItems([
    "Power Supply", "WIFI Dongle", "Memory", "Motherboard",
    "Processor", "Hard Disk Drive", "Video Card", "PCI Card Port",
    "Network Card", "CD / DVD", "Monitor", "AVR", "UPS", "Others",
  ]),
  software: toItems([
    "Windows", "Anti-virus", "MS Office",
    "Remote Application", "Other Please Specify",
  ]),
  network: toItems([
    "Firewall", "Wi-Fi / Router", "Switch Hub",
    "Patch Panel", "Information Outlet",
  ]),
  printer: toItems(["Mechanical Gears", "Adaptor", "Printer Head", "Sensor"]),
  cctv: toItems(["DVR / NVR", "Camera", "Accessories"]),
  devices: toItems(["Desktop", "Laptop", "Tablet", "Mobile Phone", "Zebra", "Others"]),
  warranty: toItems(["Out of Warranty", "Pending", "Maintenance", "Backup"]),
};

const INITIAL_FORM: FormState = {
  ticketNo: "", date: "", name: "", timeIn: "", timeOut: "",
  requestBy: "", requestReceived: "", problemReported: "",
  causeOfProblem: "", actionTaken: "", comments: "",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const PrintIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const CheckIcon = () => (
  <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
    <polyline points="1,3 2.5,4.5 6,1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Checkbox Row ──────────────────────────────────────────────────────────────
interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const CheckboxRow: React.FC<CheckboxRowProps> = ({ label, checked, onToggle }) => (
  <div
    onClick={onToggle}
    className="flex items-center gap-2 px-3 py-1.25 border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <div className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center transition-all ${
      checked ? "bg-red-700 border-red-700" : "border-gray-300"
    }`}>
      {checked && <CheckIcon />}
    </div>
    <span className="text-[10px] text-gray-600 leading-tight whitespace-nowrap">{label}</span>
  </div>
);

// ── Checkbox Group ────────────────────────────────────────────────────────────
interface CheckboxGroupProps {
  title: string;
  items: CheckboxItem[];
  onToggle: (index: number) => void;
  cols?: 1 | 2;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, items, onToggle, cols = 2 }) => (
  <div>
    {title && (
      <div className="bg-gray-300 px-3 py-1 text-[9px] font-bold text-gray-600 uppercase tracking-widest border-t border-gray-200">
        {title}
      </div>
    )}
    <div className={`grid ${cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {items.map((item, i) => (
        <CheckboxRow key={item.label} label={item.label} checked={item.checked} onToggle={() => onToggle(i)} />
      ))}
    </div>
  </div>
);

// ── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  variant?: "dark" | "red";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, variant = "dark" }) => (
  <div className={`px-3.5 py-1.75 text-[9.5px] font-bold text-white uppercase tracking-widest ${
    variant === "red" ? "bg-red-700" : "bg-gray-900"
  }`}>
    {title}
  </div>
);

// ── Field Input ───────────────────────────────────────────────────────────────
interface FieldInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({ label, value, onChange, placeholder = "—" }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="border-0 border-b border-gray-200 bg-transparent text-[12px] text-gray-800 outline-none pb-0.5 focus:border-red-600 transition-colors placeholder:text-gray-300 w-full"
    />
  </div>
);

const ReadOnlyInput = ({ label, value }: { label: string; value: string | undefined }) => (
  <div className="flex flex gap-1">
    <span className="text-[9.5px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
    <input
      type="text"
      readOnly={true}
      value={value}
      className="border-0 border-b border-gray-200 bg-transparent text-[12px] text-gray-800 outline-none pb-0.5 w-full pointer-events-none"
    />
  </div>
);

// ── Text Area Block ───────────────────────────────────────────────────────────
interface TextAreaBlockProps {
  title: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

const TextAreaBlock: React.FC<TextAreaBlockProps> = ({ title, value, onChange, placeholder, rows = 5 }) => (
  <div className="border border-gray-200 rounded-md overflow-hidden flex-1">
    <SectionHeader title={title} />
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      maxLength={570}
      className="w-full border-0 resize-none text-[12px] text-gray-800 p-3.5 outline-none bg-transparent focus:bg-amber-50/30 transition-colors placeholder:text-gray-300 block"
    />
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const ITServiceReport: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Ticket | null>(null);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [checkboxes, setCheckboxes] = useState<CheckboxGroups>(INITIAL_CHECKBOXES);
  const date = new Date();
  const me: {name: string} = JSON.parse(user);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const fetchTicket = async() => {
    await config.get(`/inbox/${id}`)
    .then((res) => {
      setData({
        id: res.data.id,
        ticket_number: res.data.ticket_number,
        requester: res.data.requester,
        description: res.data.description,
      })
      setField("problemReported")(res.data.description)
    })
  }

  useEffect(() => {
    fetchTicket();
  }, []);

  const setField = useCallback(
    (key: keyof FormState) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  const toggleCheckbox = useCallback((group: keyof CheckboxGroups, index: number) => {
    setCheckboxes((prev) => ({
      ...prev,
      [group]: prev[group].map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      ),
    }));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @media print {
          @page { margin: 10mm; size: A4; }
          .no-print { display: none !important; }
          body { background: #ffffff !important; padding: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* Page wrapper */}
      <div className="min-h-screen bg-gray-200 px-4 py-6">

        {/* Toolbar */}
        <div className="no-print max-w-225 mx-auto mb-4 px-1">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 font-mono">
              IT Service Report — HII
            </span>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white text-[12px] font-semibold px-4 py-2 rounded-md transition-colors"
            >
              <PrintIcon />
              Print / Save PDF
            </button>
          </div>
          
          {/* Print tips — hidden on print via .no-print on parent */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md px-3.5 py-2.5">
            <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              <span className="font-semibold">Print tips:</span> Use <span className="font-semibold">Legal paper size</span> for best results.
              In the print dialog, adjust <span className="font-semibold">Scale</span> until the entire form fits on a single page.
              This notice will not appear in print.
            </p>
          </div>
        </div>
 


        {/* Paper */}
        <div className="max-w-225 mx-auto bg-white rounded shadow-lg overflow-hidden text-[13px] text-gray-900">

          {/* Header */}
          <div className="bg-[#1a1a2e] grid grid-cols-[auto_1fr_auto] items-center gap-3 px-7 pt-5">
            <div className="rounded py-1.5 flex flex-col items-center gap-0.5 w-36">
              <img src="/others/TOYOTA_MH_logo_.png" alt="logo" />
              {/* <span className="text-[15px] font-extrabold text-white tracking-widest">TOYOTA</span>
              <span className="text-[6.5px] font-bold text-red-200 uppercase tracking-widest">Material Handling</span> */}
            </div>
            <div>
              <div className="text-[18px] font-bold text-white tracking-tight">
                Handling Innovation Incorporated
              </div>
              <div className="text-[10.5px] text-gray-400 mt-0.5">
                Dow Jones Bldg., Whse5A, KM 19 WSR, SSH, Parañaque
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-gray-400 font-mono leading-relaxed">
                0998.586.41.16 · 0956.311.49.46<br />
                8822-2321 / 8810 5108 / 8823 8377 loc 406
              </div>
              <div className="text-[10px] text-blue-300 font-mono mt-0.5">
                it01@toyotaforklifts-philippines.com
              </div>
            </div>
          </div>

          {/* Dept Strip */}
          <div className="bg-[#1a1a2e] px-7 py-2.5 flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-200 uppercase tracking-widest">
              IT Department
            </span>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                  Ticket No.
                </span>
                <input
                  readOnly={true}
                  type="text"
                  value={data?.ticket_number}
                  className="bg-transparent border-0 border-b border-gray-600 text-[12px] text-slate-200 font-mono w-28 px-1.5 py-0.5 outline-none text-center pointer-events-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                  Date
                </span>
                <input
                  readOnly={true}
                  type="text"
                  value={formattedDate}
                  className="bg-transparent border-0 border-b border-gray-600 text-[12px] text-slate-200 font-mono w-28 px-1.5 py-0.5 outline-none text-center pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Title Bar */}
          <div className="bg-red-700 text-center py-2.5">
            <h1 className="text-[14px] font-extrabold text-white uppercase tracking-[0.18em] m-0">
              Service Report
            </h1>
          </div>

          {/* Body */}
          <div className="px-7 py-5 flex flex-col gap-4">

            {/* Meta Fields */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="grid grid-cols-4 border-b border-gray-200">
                <div className="col-span-2 px-3.5 py-2.5 border-r border-gray-200">
                  <ReadOnlyInput label="Name" value={data?.requester} />
                </div>
                <div className="px-3.5 py-2.5 border-r border-gray-200">
                  <FieldInput label="Time In" value={form.timeIn} onChange={setField("timeIn")} placeholder="" />
                </div>
                <div className="px-3.5 py-2.5">
                  <FieldInput label="Time Out / Total Hours" value={form.timeOut} onChange={setField("timeOut")} placeholder="" />
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-[280px_1fr] gap-4">

              {/* Left: Checkboxes */}
              <div className="flex flex-col gap-3">
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <SectionHeader title="Support Type" />
                  <CheckboxGroup title="Hardware" items={checkboxes.hardware} onToggle={(i) => toggleCheckbox("hardware", i)} />
                  <CheckboxGroup title="Software" items={checkboxes.software} onToggle={(i) => toggleCheckbox("software", i)} />
                  <CheckboxGroup title="Network / Internet" items={checkboxes.network} onToggle={(i) => toggleCheckbox("network", i)} />
                  <CheckboxGroup title="Printer" items={checkboxes.printer} onToggle={(i) => toggleCheckbox("printer", i)} />
                  <CheckboxGroup title="CCTV" items={checkboxes.cctv} onToggle={(i) => toggleCheckbox("cctv", i)} cols={1} />
                  <CheckboxGroup title="Devices" items={checkboxes.devices} onToggle={(i) => toggleCheckbox("devices", i)} />
                </div>

                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <SectionHeader title="Warranty Unit" variant="red" />
                  <CheckboxGroup title="" items={checkboxes.warranty} onToggle={(i) => toggleCheckbox("warranty", i)} cols={1} />
                </div>
              </div>

              {/* Right: Text Areas */}
              <div className="flex flex-col gap-3">
                <TextAreaBlock
                  // title="Problem Reported"
                  // value={data?.description}
                  title="Problem Reported"
                  value={form.problemReported}
                  onChange={setField("problemReported")}
                  placeholder=""
                  rows={9}
                />
                <TextAreaBlock
                  title="Cause of the Problem"
                  value={form.causeOfProblem}
                  onChange={setField("causeOfProblem")}
                  placeholder=""
                  rows={9}
                />
                <TextAreaBlock
                  title="Action Taken"
                  value={form.actionTaken}
                  onChange={setField("actionTaken")}
                  placeholder=""
                  rows={9}
                />

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "IT Engineer", caption: "Signature over Printed Name" },
                    { title: "Work Confirmed & Approved", caption: "Signature over Printed Name / Date" },
                  ].map(({ title, caption }) => (
                    <div key={title} className="border border-gray-200 rounded-md overflow-hidden">
                      <SectionHeader title={title} />
                      <div className="px-3.5 pt-4.5 pb-4">
                        <div className="border-t border-gray-800 mt-12" />
                        <p className="text-[9px] text-gray-400 mt-1 tracking-wide text-center relative">
                          <span className="absolute -top-3.25 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs text-neutral-600 whitespace-nowrap">{ title === 'IT Engineer' ? me.name : data?.requester }</span>
                          {caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <SectionHeader title="Comments / Suggestions" />
              <textarea
                value={form.comments}
                onChange={(e) => setField("comments")(e.target.value)}
                placeholder=""
                rows={3}
                className="w-full border-0 resize-none text-[12px] text-gray-800 p-3.5 outline-none bg-transparent focus:bg-amber-50/30 transition-colors placeholder:text-gray-300 block"
              />
            </div>
          </div>

          {/* Footer */}
          {/* <div className="bg-gray-50 border-t border-gray-200 px-7 py-2.5 flex items-center justify-center gap-3">
            {[
              { label: "Original Copy — IT", cls: "bg-gray-900" },
              { label: "Blue Copy — HRD", cls: "bg-blue-600" },
              { label: "Green Copy — Branch / Site", cls: "bg-green-700" },
            ].map(({ label, cls }) => (
              <span key={label} className={`${cls} text-white text-[9.5px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full`}>
                {label}
              </span>
            ))}
          </div> */}

        </div>
      </div>
    </>
  );
};

export default ITServiceReport;