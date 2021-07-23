import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface Props {
  pageCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  query: any;
}

export default function PageSelector(props: Props) {
  return (
    <div className="selector">
      <ul className="selector__container">
        {/*To first page*/}
        <Link
          href={{
            pathname: "/store",
            query: {
              ...props.query,
              page: 1,
            },
          }}
        >
          <a>
            <FiChevronsLeft className="selector__action" />
          </a>
        </Link>
        {/*Back one page*/}
        <Link
          href={{
            pathname: "/store",
            query: {
              ...props.query,
              page: props.query.page - 1 || 1,
            },
          }}
        >
          <a>
            <FiChevronLeft className="selector__action" />
          </a>
        </Link>
        {/*Page numbers*/}
        {[...Array(props.pageCount)].map((value: any, index: number) => {
          return (
            <Link
              href={{
                pathname: "/store",
                query: {
                  ...props.query,
                  page: index + 1,
                },
              }}
              key={Math.random()}
            >
              <a>
                <span className="selector__number selector__action">{index + 1}</span>
              </a>
            </Link>
          );
        })}
        {/*Forward one page*/}
        <Link
          href={{
            pathname: "/store",
            query: {
              ...props.query,
              page:
                props.query.page == props.pageCount
                  ? props.pageCount
                  : parseInt(props.query.page) + 1,
            },
          }}
        >
          <a>
            <FiChevronRight className="selector__action" />
          </a>
        </Link>
        {/*To last page*/}
        <Link
          href={{
            pathname: "/store",
            query: {
              ...props.query,
              page: props.pageCount,
            },
          }}
        >
          <a>
            <FiChevronsRight className="selector__action" />
          </a>
        </Link>
      </ul>
    </div>
  );
}
