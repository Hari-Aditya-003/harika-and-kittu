export const processionImages = {
  procession: `${import.meta.env.BASE_URL}images/opening/wedding-procession.webp`,
};

export function WeddingProcession() {
  return (
    <div className="wedding-procession" aria-hidden="true">
      <img src={processionImages.procession} width="1440" height="480" alt="" />
      <div className="procession-ground" />
    </div>
  );
}
