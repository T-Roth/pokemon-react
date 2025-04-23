type PaginationProps = {
  gotoNextPage?: () => void;
  gotoPrevPage?: () => void;
};

export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
}: PaginationProps) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
}
