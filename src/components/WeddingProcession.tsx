const imageBase = `${import.meta.env.BASE_URL}images/opening/`;

export const processionImages = {
  musicians: `${imageBase}musicians-sheet.webp`,
  procession: `${imageBase}procession-sheet.webp`,
};

/** Crop the supplied sheet in the viewport without resampling the artwork. */
function SheetFrame({
  sheet,
  viewBox,
  className = "",
}: {
  sheet: string;
  viewBox: string;
  className?: string;
}) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      <image href={sheet} width="1408" height="768" />
    </svg>
  );
}

export function WeddingProcession() {
  return (
    <div className="wedding-procession" aria-hidden="true">
      <div className="procession-arrival">
        <div className="wedding-musicians">
          <SheetFrame
            sheet={processionImages.musicians}
            viewBox="38 455 335 280"
            className="musicians-marching"
          />
          <SheetFrame
            sheet={processionImages.musicians}
            viewBox="798 455 575 280"
            className="musicians-dancing"
          />
        </div>
        <div className="wedding-groom">
          {["80 74 350 396", "569 74 350 396", "997 74 350 396"].map(
            (viewBox, index) => (
              <SheetFrame
                key={viewBox}
                sheet={processionImages.procession}
                viewBox={viewBox}
                className={`groom-frame groom-frame-${index}`}
              />
            ),
          )}
        </div>
      </div>
      <div className="procession-bride">
        <SheetFrame
          sheet={processionImages.procession}
          viewBox="674 451 716 282"
        />
      </div>
      <div className="procession-ground" />
    </div>
  );
}
