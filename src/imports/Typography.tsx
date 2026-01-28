function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px not-italic relative">
      <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px] w-full">Typography</p>
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#475569] text-[20px] w-full">Styles for headings, paragraphs, lists...etc</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0f172a] col-1 content-stretch flex items-center justify-center ml-0 mt-0 px-[16px] py-[8px] relative rounded-[6px] row-1 w-[96px]" data-name="button">
      <a className="block css-g0mm18 font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-white" href="https://ui.shadcn.com/docs/primitives/typography">
        <p className="[text-decoration-skip-ink:none] css-ew64yg cursor-pointer decoration-solid leading-[24px] underline">View docs</p>
      </a>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Button />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame3 />
      <Group1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
      <Frame2 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 2" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 text-[#0f172a]">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[30px] tracking-[-0.225px]">h1</p>
      <div className="css-g0mm18 font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[48px] relative shrink-0 text-[48px] tracking-[-0.576px]">
        <p className="css-ew64yg mb-0">{`Taxing Laughter: The Joke Tax `}</p>
        <p className="css-ew64yg">Chronicles</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[32px] items-start leading-[36px] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px] w-full">
      <p className="css-ew64yg relative shrink-0">h2</p>
      <p className="css-4hzbpn min-w-full relative shrink-0 w-[min-content]">The People of the Kingdom</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[32px] items-start not-italic relative shrink-0 text-[#0f172a] w-full">
      <p className="css-ew64yg leading-[36px] relative shrink-0 text-[30px] tracking-[-0.225px]">h3</p>
      <p className="css-4hzbpn leading-[32px] min-w-full relative shrink-0 text-[24px] tracking-[-0.144px] w-[min-content]">The Joke Tax</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[32px] items-start not-italic relative shrink-0 text-[#0f172a] w-full">
      <p className="css-ew64yg leading-[36px] relative shrink-0 text-[30px] tracking-[-0.225px]">h4</p>
      <p className="css-ew64yg leading-[28px] relative shrink-0 text-[20px] tracking-[-0.1px]">People stopped telling jokes</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 text-[#0f172a] w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[30px] tracking-[-0.225px]">p</p>
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[16px] w-[686px]">The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <p className="col-1 css-4hzbpn font-['Inter:Italic',sans-serif] font-normal italic leading-[24px] ml-[28.71px] mt-0 relative row-1 text-[#0f172a] text-[16px] w-[651.286px]">{`"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."`}</p>
      <div className="col-1 flex h-[48px] items-center justify-center ml-0 mt-0 relative row-1 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "38" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[48px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 2">
                <line id="Line 1" stroke="var(--stroke-0, #E3E3E3)" strokeWidth="2" x2="48" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px]">blockquote</p>
      <Group />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="bg-white content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[315px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">King’s Treasury</p>
      </div>
      <div className="bg-white content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[374px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">People’s happiness</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="bg-white content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[315px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">Empty</p>
      </div>
      <div className="bg-white content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[374px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">Overflowing</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="bg-[#f1f5f9] content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[315px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">Modest</p>
      </div>
      <div className="bg-[#f1f5f9] content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[374px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">Satisfied</p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="bg-white content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[315px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">Empty</p>
      </div>
      <div className="bg-white content-stretch flex items-start px-[16px] py-[8px] relative shrink-0 w-[374px]" data-name="table item">
        <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-[-0.5px] pointer-events-none" />
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0f172a] text-[16px]">Overflowing</p>
      </div>
    </div>
  );
}

function Table({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col items-start relative shrink-0"} data-name="table">
      <Frame10 />
      <Frame11 />
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px]">table</p>
      <Table />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start leading-[0] relative shrink-0 text-[16px]" data-name="list">
      <ul className="block css-g0mm18 relative shrink-0">
        <li className="css-4hzbpn ms-[24px]">
          <span className="leading-[24px]">1st level of puns: 5 gold coins</span>
        </li>
      </ul>
      <ul className="block css-g0mm18 relative shrink-0">
        <li className="css-4hzbpn ms-[24px]">
          <span className="leading-[24px]">2nd level of jokes: 10 gold coins</span>
        </li>
      </ul>
      <ul className="block css-g0mm18 relative shrink-0">
        <li className="css-4hzbpn ms-[24px]">
          <span className="leading-[24px]">3rd level of one-liners : 20 gold coins</span>
        </li>
      </ul>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 text-[#0f172a] w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[30px] tracking-[-0.225px]">list</p>
      <List />
    </div>
  );
}

function InlineCode() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-start px-[4px] py-[3px] relative rounded-[3px] shrink-0" data-name="inline code">
      <p className="css-ew64yg font-['Menlo:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-black">@radix-ui/react-alert-dialog</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] not-italic relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px]">inline code</p>
      <InlineCode />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 text-[#0f172a] w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[30px] tracking-[-0.225px]">lead</p>
      <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[20px] w-[666px]">A modal dialog that interrupts the user with important content and expects a response.</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[32px] items-start not-italic relative shrink-0 w-full">
      <p className="css-ew64yg leading-[36px] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px]">large</p>
      <p className="css-ew64yg leading-[28px] relative shrink-0 text-[18px] text-black">Are you sure absolutely sure?</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px]">small</p>
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[14px] relative shrink-0 text-[14px] text-black">Email address</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start not-italic relative shrink-0 w-full">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] relative shrink-0 text-[#0f172a] text-[30px] tracking-[-0.225px]">subtle</p>
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#64748b] text-[14px]">Enter your email address.</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-start justify-center relative shrink-0">
      <Frame />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame4 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame5 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame6 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame7 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame8 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame12 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame15 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame16 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame17 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame18 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame19 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame20 />
      <div className="h-0 relative shrink-0 w-[969px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 969 1">
            <line id="Line 3" stroke="var(--stroke-0, #E2E8F0)" x2="969" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Typography() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[64px] items-center pb-[64px] pt-[32px] px-[32px] relative size-full" data-name="Typography">
      <Frame1 />
      <Frame9 />
    </div>
  );
}