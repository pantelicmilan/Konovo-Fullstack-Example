import traceback
from fastapi import Request
from fastapi.responses import JSONResponse


async def global_exception_handler(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as exc:
        traceback.print_exc()  # logovanje detalja greške u konzolu

        # Ako exception ima poruku, iskoristi je; inače default
        detail = str(exc) if str(exc) else "Internal server error"

        return JSONResponse(
            status_code=500,
            content={"detalji": detail}
        )